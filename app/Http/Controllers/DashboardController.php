<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Quote;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            return Inertia::render('Admin/Dashboard');
        }

        // Default user dashboard
        return Inertia::render('User/Dashboard', [
            'stats' => [
                'activeOrdersCount' => Order::where('user_id', $user->id)->whereIn('status', ['pending', 'processing', 'shipped'])->count(),
                'savedQuotesCount' => Quote::where('user_id', $user->id)->count(),
            ]
        ]);
    }

    public function parts()
    {
        return Inertia::render('User/Parts/Index');
    }
}
