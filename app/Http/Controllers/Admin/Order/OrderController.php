<?php

namespace App\Http\Controllers\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Services\AdminOrderSnapshot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = AdminOrderSnapshot::get($request);
        
        $counts = [
            'all' => Order::count(),
            'pending' => Order::where('status', 'pending')->count(),
            'processing' => Order::where('status', 'processing')->count(),
            'picked_up' => Order::where('status', 'picked_up')->count(),
            'delivered' => Order::where('status', 'delivered')->count(),
            'cancelled' => Order::where('status', 'cancelled')->count(),
        ];

        return Inertia::render('Admin/Order/Index', [
            'orders' => $orders,
            'filters' => $request->only(['search', 'status', 'per_page']),
            'counts' => $counts,
        ]);
    }

    public function show(Order $order)
    {
        $order->load(['user', 'items.product.files', 'payment']);

        return Inertia::render('Admin/Order/Show', [
            'order' => $order,
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,processing,picked_up,delivered,cancelled',
        ]);

        $order->update($validated);

        // Flush cache to reflect status change
        AdminOrderSnapshot::flush();

        return back()->with('success', "Order #{$order->order_number} status updated to " . ucfirst($validated['status']));
    }
}
