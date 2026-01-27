<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Quote;
use App\Models\Announcement;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();

        if ($user->isAdmin()) {
            return Inertia::render('Admin/Dashboard');
        }

        // Fetch products for different sections
        $sellingItems = \App\Models\Product::with(['files', 'subCategory', 'fitments'])
            ->latest()
            ->take(4)
            ->get();

        $mechanicalItems = \App\Models\Product::with(['files', 'subCategory', 'fitments'])
            ->whereHas('subCategory', function ($q) {
                $q->where('name', 'like', '%Mechanical%');
            })
            ->take(4)
            ->get();

        if ($mechanicalItems->isEmpty()) {
            $mechanicalItems = $sellingItems;
        }

        $electricalItems = \App\Models\Product::with(['files', 'subCategory', 'fitments'])
            ->whereHas('subCategory', function ($q) {
                $q->where('name', 'like', '%Electrical%');
            })
            ->take(4)
            ->get();

        if ($electricalItems->isEmpty()) {
            $electricalItems = $sellingItems;
        }

        $accessories = \App\Models\Product::with(['files', 'subCategory', 'fitments'])
            ->whereHas('subCategory', function ($q) {
                $q->where('name', 'like', '%Accessory%')
                    ->orWhere('name', 'like', '%Accessories%');
            })
            ->take(4)
            ->get();

        if ($accessories->isEmpty()) {
            $accessories = $sellingItems;
        }

        // Fetch Categories for the grid
        $categories = \App\Models\Category::where('status', 1)
            ->take(4)
            ->get()
            ->map(function($cat, $index) {
                // Assign a color based on index if not stored in DB
                $colors = ['bg-black', 'bg-[#F5B52E]', 'bg-[#B90000]', 'bg-black'];
                return [
                    'id' => $cat->id,
                    'title' => $cat->name,
                    'img' => $cat->image ? '/storage/' . $cat->image : null,
                    'color' => $colors[$index % count($colors)],
                ];
            });

        // Default user dashboard
        return Inertia::render('User/Dashboard', [
            'stats' => [
                'activeOrdersCount' => Order::where('user_id', $user->id)->whereIn('status', ['pending', 'processing', 'shipped'])->count(),
                'savedQuotesCount' => Quote::where('user_id', $user->id)->count(),
            ],
            'categories' => $categories,
            'announcement' => Announcement::where('is_active', true)->latest()->first(),
            'sections' => [
                'sellingItems' => $sellingItems,
                'mechanicalItems' => $mechanicalItems,
                'electricalItems' => $electricalItems,
                'accessories' => $accessories,
            ],
        ]);
    }

    public function parts()
    {
        return Inertia::render('User/Parts/Index');
    }
}
