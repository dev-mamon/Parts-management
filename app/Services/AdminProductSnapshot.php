<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminProductSnapshot
{
    public static function get(Request $request)
    {
        $filters = $request->only([
            'search', 'status', 'category', 'sub_category', 'per_page', 'page',
        ]);
        $cacheKey = 'admin:products:'.md5(json_encode($filters));

        // Optimized File Cache - Fast & Simple (No Redis Required)
        return Cache::remember($cacheKey, 180, function () use ($request) {
            $perPage = $request->per_page ?? 10;

            $query = Product::query()
                ->select(['id', 'sku', 'description', 'visibility', 'category_id', 'sub_category_id', 'created_at', 'list_price', 'buy_price', 'stock_oakville', 'stock_mississauga', 'stock_saskatoon', 'location_id'])
                ->with([
                    'category:id,name',
                    'subCategory:id,name',
                    // Optimized: Load only first image file
                    'files' => function ($query) {
                        $query->select(['id', 'product_id', 'thumbnail_path', 'file_type'])
                              ->where('file_type', 'like', 'image%')
                              ->orderBy('id', 'asc')
                              ->limit(1);
                    }
                ])
                ->when($request->status, function ($q, $status) {
                    match ($status) {
                        'published' => $q->where('visibility', 'public'),
                        'draft' => $q->where('visibility', 'draft'),
                        'private' => $q->where('visibility', 'private'),
                        'no_image' => $q->whereDoesntHave('files'),
                        default => null,
                    };
                })
                ->when($request->search, function ($q, $search) {
                    // Optimized search with index-friendly pattern
                    $q->where(function ($qq) use ($search) {
                        $qq->where('sku', 'like', "{$search}%")
                            ->orWhere('description', 'like', "%{$search}%")
                            ->orWhereHas('partsNumbers', function($pq) use ($search) {
                                $pq->where('part_number', 'like', "%{$search}%");
                            });
                    });
                })
                ->when($request->category, fn ($q, $cat) => $q->whereHas('category', fn($cq) => $cq->where('name', $cat)))
                ->when($request->sub_category, fn ($q, $sub) => $q->whereHas('subCategory', fn($sq) => $sq->where('name', $sub)))
                ->latest('id');

            // Use simple pagination for better performance
            return $query->paginate($perPage)->withQueryString();
        });
    }

    public static function flush(): void
    {
        // Clear product-related cache
        Cache::flush();
    }
}
