<?php

namespace App\Http\Controllers\User\Booking;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Setting;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\StripeClient;
use Stripe\Webhook;

class PaymentController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    private function getStripeClient()
    {
        $secretKey = config('services.stripe.secret') ?? Setting::where('key', 'stripe_secret_key')->value('value');

        if (! $secretKey) {
            throw new \Exception('Stripe secret key not configured in settings or .env.');
        }

        return new StripeClient($secretKey);
    }

    public function checkout(Request $request)
    {
        try {
            // Create order first
            $order = $this->orderService->createOrderFromCart($request->user(), $request->all());

            // Load items and products for Stripe
            $order->load('items.product');

            $stripe = $this->getStripeClient();

            $lineItems = [];
            foreach ($order->items as $item) {
                $lineItems[] = [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $item->product->name ?? 'Part #'.($item->product->sku ?? $item->product->id),
                        ],
                        'unit_amount' => (int) ($item->price * 100), // Stripe expects amounts in cents
                    ],
                    'quantity' => $item->quantity,
                ];
            }

            $session = $stripe->checkout->sessions->create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => route('payment.success', ['order_number' => $order->order_number]).'?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('payment.cancel'),
                'customer_email' => auth()->user()->email,
                'metadata' => [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                ],
            ]);
            $order->payment()->update([
                'transaction_id' => $session->id,
            ]);

            return Inertia::location($session->url);

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function success(Request $request)
    {
        $order = Order::where('order_number', $request->order_number)
            ->with(['items.product', 'payment'])
            ->firstOrFail();
        if ($order->status === 'pending' && $request->has('session_id')) {
            try {
                $stripe = $this->getStripeClient();
                $session = $stripe->checkout->sessions->retrieve($request->session_id);
                if ($session->payment_status === 'paid') {
                    $order->update(['status' => 'processing']);
                    $order->payment()->update([
                        'status' => 'succeeded',
                        'payment_details' => $session->toArray(),
                    ]);
                }
            } catch (\Exception $e) {

            }
        }

        return Inertia::render('User/Payment/Success', [
            'order' => $order,
        ]);
    }

    public function cancel()
    {
        return Inertia::render('User/Payment/Cancle');
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');
        $webhookSecret = config('services.stripe.webhook_secret') ?? Setting::where('key', 'stripe_webhook_secret')->value('value');

        if (! $webhookSecret) {
            return response()->json(['error' => 'Webhook secret not configured in settings or .env'], 500);
        }

        try {
            $event = Webhook::constructEvent(
                $payload, $sig_header, $webhookSecret
            );
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $orderId = $session->metadata->order_id;

            $order = Order::with('payment')->find($orderId);
            if ($order && $order->status === 'pending') {
                $order->update(['status' => 'processing']);
                $order->payment()->update([
                    'status' => 'succeeded',
                    'payment_details' => $session->toArray(),
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }
}
