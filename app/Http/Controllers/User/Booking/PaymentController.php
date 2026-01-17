<?php

namespace App\Http\Controllers\User\Booking;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function checkout(Request $request)
    {
        try {
            $order = $this->orderService->createOrderFromCart(auth()->user(), $request->all());

            return redirect()->route('payment.success', ['order_number' => $order->order_number]);

        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function success(Request $request)
    {
        $order = Order::where('order_number', $request->order_number)
            ->with(['items.product'])
            ->firstOrFail();

        $order->update(['status' => 'processing']);
        $order->payment()->update(['status' => 'succeeded']);

        return Inertia::render('User/Payment/Success', [
            'order' => $order,
        ]);
    }

    public function cancel()
    {
        return Inertia::render('User/Payment/Cancle');
    }
}
