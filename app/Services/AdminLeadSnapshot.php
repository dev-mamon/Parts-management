<?php

namespace App\Services;

use App\Models\Lead;
use Illuminate\Support\Facades\Cache;

class AdminLeadSnapshot
{
    /**
     * Get paginated leads with searching.
     */
    public static function getPaginatedLeads($filters = [], $perPage = 15)
    {
        $query = Lead::withCount('parts');

        // Search Filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('shop_name', 'like', "%{$search}%")
                  ->orWhere('name', 'like', "%{$search}%")
                  ->orWhere('vehicle_info', 'like', "%{$search}%")
                  ->orWhere('vin', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();
    }

    /**
     * Clear leads cache.
     */
    public static function clearCache()
    {
        Cache::flush();
    }
}
