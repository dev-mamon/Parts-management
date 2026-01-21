<?php

namespace App\Services;

use App\Models\ReturnRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class AdminReturnRequestSnapshot
{
    public static function get(Request $request)
    {
        $filters = $request->only([
            'search', 'status', 'per_page', 'page',
        ]);
        $cacheKey = 'admin:return_requests:'.md5(json_encode($filters));

        return Cache::remember($cacheKey, 180, function () use ($request) {
            $perPage = $request->per_page ?? 10;

            $query = ReturnRequest::query()
                ->select(['id', 'order_id', 'user_id', 'reason', 'status', 'created_at'])
                ->with([
                    'user:id,first_name,last_name,email',
                    'order:id,order_number'
                ]);

            // Search
            if ($request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('reason', 'like', "%{$search}%")
                      ->orWhereHas('user', function($uq) use ($search) {
                          $uq->where('first_name', 'like', "%{$search}%")
                            ->orWhere('last_name', 'like', "%{$search}%")
                            ->orWhere('email', 'like', "%{$search}%");
                      })
                      ->orWhereHas('order', function($oq) use ($search) {
                          $oq->where('order_number', 'like', "{$search}%");
                      });
                });
            }

            // Status Filter
            if ($request->status && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            return $query->latest('id')->paginate($perPage)->withQueryString();
        });
    }

    public static function flush(): void
    {
        Cache::flush();
    }
}
