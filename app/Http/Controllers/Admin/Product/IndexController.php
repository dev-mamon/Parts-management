<?php

namespace App\Http\Controllers\Admin\Product;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductStoreRequest;
use App\Models\Category;
use App\Models\PartsNumber;
use App\Models\Product;
use App\Models\ProductFile;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::query()
            ->with([
                'category:id,name',
                'subCategory:id,name',
                'partsNumbers',
                'files',
                'fitments',
            ])
            ->when($request->search, function ($query, $search) {
                $query->where('description', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/Product/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Product/Create', [
            'categories' => Category::all(),
            'subCategories' => SubCategory::all(),
        ]);
    }

    // store product
    public function store(ProductStoreRequest $request)
    {
        DB::beginTransaction();

        try {
            // 1. Create the Main Product
            $product = Product::create([
                'category_id' => $request->category_id,
                'sub_category_id' => $request->sub_category_id,
                'description' => $request->description,
                'buy_price' => $request->buy_price,
                'list_price' => $request->list_price,
                'stock_oakville' => $request->stock_oakville ?? 0,
                'stock_mississauga' => $request->stock_mississauga ?? 0,
                'stock_saskatoon' => $request->stock_saskatoon ?? 0,
                'sku' => $request->sku,
                'location_id' => $request->location_id,
                'visibility' => $request->visibility ?? 'public',
            ]);

            // 2. Save Fitments
            if ($request->has('fitments')) {
                foreach ($request->fitments as $fitment) {
                    // Only save if year_from or make is provided to avoid empty rows
                    if (! empty($fitment['year_from']) || ! empty($fitment['make'])) {
                        $product->fitments()->create([
                            'year_from' => $fitment['year_from'],
                            'year_to' => $fitment['year_to'],
                            'make' => $fitment['make'],
                            'model' => $fitment['model'],
                        ]);
                    }
                }
            }

            // 3. Save Part Numbers
            if ($request->has('part_numbers')) {
                foreach ($request->part_numbers as $number) {
                    if (! empty($number)) {
                        PartsNumber::create([
                            'product_id' => $product->id,
                            'part_number' => $number,
                        ]);
                    }
                }
            }

            // 4. Handle Image Uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $fileName = $image->getClientOriginalName();
                    $fileSize = $image->getSize();
                    $fileType = $image->getClientMimeType();
                    $path = Helper::uploadFile('products', $image);
                    ProductFile::create([
                        'product_id' => $product->id,
                        'file_name' => $fileName,
                        'file_path' => $path,
                        'file_size' => $fileSize,
                        'file_type' => $fileType,
                    ]);
                }
            }

            DB::commit();

            return redirect()->route('products.index')
                ->with('success', 'Product created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();

            // Log the error for debugging
            Log::error('Product Store Error: '.$e->getMessage());

            return back()->withErrors(['error' => 'Failed to create product. Please try again.'])
                ->withInput();
        }
    }
}
