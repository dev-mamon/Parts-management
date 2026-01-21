<?php

namespace App\Http\Controllers\Admin\ReturnRequest;

use App\Http\Controllers\Controller;
use App\Models\ReturnRequest;
use App\Services\AdminReturnRequestSnapshot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReturnRequestController extends Controller
{
    public function index(Request $request)
    {
        $requests = AdminReturnRequestSnapshot::get($request);
        
        $counts = [
            'all' => ReturnRequest::count(),
            'pending' => ReturnRequest::where('status', 'pending')->count(),
            'approved' => ReturnRequest::where('status', 'approved')->count(),
            'rejected' => ReturnRequest::where('status', 'rejected')->count(),
            'completed' => ReturnRequest::where('status', 'completed')->count(),
        ];

        return Inertia::render('Admin/ReturnRequest/Index', [
            'requests' => $requests,
            'filters' => $request->only(['search', 'status', 'per_page']),
            'counts' => $counts,
        ]);
    }

    public function show(ReturnRequest $returnRequest)
    {
        $returnRequest->load(['user', 'order.items.product.files']);

        return Inertia::render('Admin/ReturnRequest/Show', [
            'returnRequest' => $returnRequest,
        ]);
    }

    public function updateStatus(Request $request, ReturnRequest $returnRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approved,rejected,completed',
            'rejection_reason' => 'required_if:status,rejected|nullable|string',
        ]);

        $returnRequest->update($validated);

        // Flush cache
        AdminReturnRequestSnapshot::flush();

        return back()->with('success', "Return Request status updated to " . ucfirst($validated['status']));
    }
}
