<?php

namespace App\Http\Controllers\Admin\Support;

use App\Http\Controllers\Controller;
use App\Models\SupportTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportController extends Controller
{
    public function index(Request $request)
    {
        $status = $request->input('status');
        $search = $request->input('search');

        $tickets = SupportTicket::query()
            ->when($status, fn ($q) => $q->where('status', $status))
            ->when($search, function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('order_id', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(12)
            ->withQueryString();

        $counts = [
            'all' => SupportTicket::count(),
            'pending' => SupportTicket::where('status', 'pending')->count(),
            'in_progress' => SupportTicket::where('status', 'in_progress')->count(),
            'resolved' => SupportTicket::where('status', 'resolved')->count(),
            'closed' => SupportTicket::where('status', 'closed')->count(),
        ];

        return Inertia::render('Admin/Support/Index', [
            'tickets' => $tickets,
            'filters' => $request->only(['status', 'search']),
            'counts' => $counts,
        ]);
    }

    public function updateStatus(Request $request, SupportTicket $ticket)
    {
        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $ticket->update(['status' => $validated['status']]);

        return redirect()->back()->with('success', 'Ticket status updated successfully!');
    }

    public function destroy(SupportTicket $ticket)
    {
        $ticket->delete();

        return redirect()->back()->with('success', 'Ticket deleted successfully!');
    }

    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids', []);
        $selectAllGlobal = $request->input('selectAllGlobal', false);
        $search = $request->input('search');
        $status = $request->input('status');

        if ($selectAllGlobal) {
            SupportTicket::query()
                ->when($status, fn ($q) => $q->where('status', $status))
                ->when($search, function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('order_id', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%");
                })
                ->delete();
        } elseif (! empty($ids)) {
            SupportTicket::whereIn('id', $ids)->delete();
        }

        return redirect()->back()->with('success', 'Tickets deleted successfully!');
    }
}
