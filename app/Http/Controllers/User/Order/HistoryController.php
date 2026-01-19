<?php

namespace App\Http\Controllers\User\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index()
    {
        $orders = Order::with(['items.product.files', 'items.product.fitments'])
            ->where('user_id', Auth::id())
            ->whereIn('status', ['delivered', 'cancelled'])
            ->latest()
            ->get();

        return Inertia::render('User/Order/History', [
            'orders' => $orders,
        ]);
    }
}
