<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderService
{
    public function createOrderFromCart($user, array $data)
    {
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            throw new \Exception('Cart is empty');
        }

        $subtotal = $cartItems->sum(function ($item) {
            return ($item->product->buy_price ?? $item->product->list_price) * $item->quantity;
        });

        $totalAmount = $subtotal;

        return DB::transaction(function () use ($user, $cartItems, $subtotal, $totalAmount, $data) {

            $order = Order::create([
                'user_id' => $user->id,
                'order_number' => 'ORD-'.strtoupper(Str::random(10)),
                'subtotal' => $subtotal,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'shipping_address' => $data['address'] ?? null,
                'notes' => $data['notes'] ?? null,
            ]);

            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->buy_price ?? $cartItem->product->list_price,
                ]);
            }

            Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'payment_method' => $data['payment_method'] ?? 'cod',
                'amount' => $totalAmount,
                'status' => 'pending',
            ]);
            Cart::where('user_id', $user->id)->delete();

            return $order;
        });
    }
}
