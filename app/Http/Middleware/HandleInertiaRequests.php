<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],

            'cartCount' => auth()->user()
                ? auth()->user()->carts()->count()
                : 0,

            'cartItems' => fn () => auth()->user()
                ? auth()->user()->carts()->with('product.files')->get()->map(function ($item) {
                    $firstFile = $item->product->files->first();
                    $price = $item->product->buy_price ?? $item->product->list_price;

                    return [
                        'id' => $item->id,
                        'product_id' => $item->product_id,
                        'sku' => $item->product->sku,
                        'name' => $item->product->name,
                        'description' => $item->product->description,
                        'buy_price' => $price,
                        'quantity' => $item->quantity,
                        'image' => \App\Helpers\Helper::generateURL($firstFile?->file_path),
                    ];
                }) : [],

            'cartSubtotal' => fn () => auth()->user()
                ? auth()->user()->carts()->get()->sum(function ($item) {
                    return ($item->product->buy_price ?? $item->product->list_price) * $item->quantity;
                }) : 0,
        ];
    }
}
