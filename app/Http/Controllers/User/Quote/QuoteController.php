<?php

namespace App\Http\Controllers\User\Quote;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Quote;
use App\Models\QuoteItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class QuoteController extends Controller
{
    public function index()
    {
        $quotes = Quote::where('user_id', auth()->id())
            ->with(['items.product.files', 'items.product.category'])
            ->latest()
            ->get();

        return Inertia::render('User/Quotes/Index', [
            'quotes' => $quotes,
        ]);
    }

    public function show($id)
    {
        $quote = Quote::where('user_id', auth()->id())
            ->where('id', $id)
            ->with(['items.product.files', 'items.product.category'])
            ->firstOrFail();

        return Inertia::render('User/Quotes/Show', [
            'quote' => $quote,
        ]);
    }

    public function toggle(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $user = auth()->user();

        // Find or create an active quote for the day/session or just a default "Saved Items" quote
        $quote = Quote::firstOrCreate(
            [
                'user_id' => $user->id,
                'status' => 'active',
                'title' => 'My Saved Quote',
            ],
            [
                'quote_number' => 'QUO-'.strtoupper(Str::random(6)),
                'valid_until' => now()->addDays(30),
            ]
        );

        $item = QuoteItem::where('quote_id', $quote->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($item) {
            $item->delete();
            $message = 'Removed from Saved Quotes';
        } else {
            QuoteItem::create([
                'quote_id' => $quote->id,
                'product_id' => $request->product_id,
                'quantity' => 1,
                'price_at_quote' => Product::find($request->product_id)->buy_price,
            ]);
            $message = 'Saved to Quotes';
        }

        // Update quote counts
        $quote->update([
            'items_count' => $quote->items()->count(),
            'total_amount' => $quote->items()->join('products', 'quote_items.product_id', '=', 'products.id')->sum(\DB::raw('quote_items.quantity * products.buy_price')),
        ]);

        // If quote is empty, maybe keep it or delete it? Let's keep it for now.

        return back()->with('success', $message);
    }

    public function destroy($id)
    {
        $quote = Quote::where('user_id', auth()->id())->where('id', $id)->firstOrFail();
        $quote->delete();

        return back()->with('success', 'Quote deleted');
    }

    public function convertToOrder($id)
    {
        $quote = Quote::where('user_id', auth()->id())
            ->where('id', $id)
            ->with('items')
            ->firstOrFail();

        foreach ($quote->items as $item) {
            Cart::updateOrCreate(
                ['user_id' => auth()->id(), 'product_id' => $item->product_id],
                ['quantity' => $item->quantity]
            );
        }

        return redirect()->route('carts.index', ['token' => Str::random(32)])->with('success', 'Quote converted to cart items');
    }

    public function storeFromCart(Request $request)
    {
        $user = auth()->user();
        $cartItems = Cart::where('user_id', $user->id)->with('product')->get();

        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty');
        }

        $totalAmount = $cartItems->sum(function ($item) {
            $price = $item->product->buy_price ?? $item->product->list_price;
            return $item->quantity * $price;
        });

        // Check if an identical quote was created today
        $existingQuote = Quote::where('user_id', $user->id)
            ->where('items_count', $cartItems->count())
            ->whereBetween('total_amount', [$totalAmount - 0.01, $totalAmount + 0.01])
            ->whereDate('created_at', now())
            ->first();

        if ($existingQuote) {
            return back()->with('warning', 'A quote with these identical items was already created today. Check your Saved Quotes.');
        }

        $quote = Quote::create([
            'user_id' => $user->id,
            'quote_number' => 'QUO-'.strtoupper(Str::random(6)),
            'title' => 'Cart Quote - '.now()->format('M d, Y'),
            'status' => 'active',
            'valid_until' => now()->addDays(30),
            'items_count' => $cartItems->count(),
            'total_amount' => $totalAmount,
        ]);

        foreach ($cartItems as $item) {
            QuoteItem::create([
                'quote_id' => $quote->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price_at_quote' => $item->product->buy_price ?? $item->product->list_price,
            ]);
        }

        return redirect()->route('quotes.index')->with('success', 'Cart saved as a new quote');
    }
}
