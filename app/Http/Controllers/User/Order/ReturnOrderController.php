<?php

namespace App\Http\Controllers\User\Order;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\ReturnRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReturnOrderController extends Controller
{
    /**
     * Display the list of return requests and eligible orders.
     */
    public function returnOrder()
    {
        $returns = ReturnRequest::with(['order.items.product.files'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get();

        // Only orders that are delivered can be returned
        $orders = \App\Models\Order::with(['items.product.files'])
            ->where('user_id', Auth::id())
            ->where('status', 'delivered')
            ->latest()
            ->get();

        return Inertia::render('User/Order/Return', [
            'returns' => $returns,
            'orders' => $orders,
        ]);
    }

    /**
     * Handle the submission of a new return request.
     */
    public function returnRequest(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id',
            'reason' => 'required|string',
            'description' => 'required|string|min:10',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        // 1. Check if user owns the order
        $order = \App\Models\Order::where('id', $validated['order_id'])
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // 2. Handle File Upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $upload = Helper::uploadFile('returns', $request->file('image'), false);
            $imagePath = $upload['original'] ?? null;
        }

        // 3. Create the Return Request record
        ReturnRequest::create([
            'user_id' => Auth::id(),
            'order_id' => $order->id,
            'reason' => $validated['reason'],
            'description' => $validated['description'],
            'image_path' => $imagePath,
            'status' => 'pending',
        ]);

        // 4. Redirect with success message
        return redirect()->back()->with('success', 'Your return request has been submitted successfully.');
    }
}
