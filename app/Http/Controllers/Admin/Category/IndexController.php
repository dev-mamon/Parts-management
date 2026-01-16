<?php

namespace App\Http\Controllers\Admin\Category;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index(Request $request)
    {
        $category = Category::query()
            ->with('subCategories')
            ->when($request->search, function ($q, $search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('subCategories', function ($subQuery) use ($search) {
                        $subQuery->where('name', 'like', "%{$search}%");
                    });
            })
            ->latest()
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/Category/Index', [
            'category' => $category,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Category/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        DB::transaction(function () use ($request) {
            foreach ($request->validated()['categories'] as $categoryData) {

                $categoryImagePath = isset($categoryData['image'])
                    ? Helper::uploadFile('categories', $categoryData['image'])
                    : null;

                $category = Category::create([
                    'name' => $categoryData['name'],
                    'slug' => Str::slug($categoryData['name']),
                    'image' => $categoryImagePath,
                    'status' => $categoryData['status'],
                    'featured' => $categoryData['featured'] ?? false,
                ]);

                if (! empty($categoryData['sub_categories'])) {
                    foreach ($categoryData['sub_categories'] as $subCategoryData) {
                        if (! empty($subCategoryData['name'])) {
                            SubCategory::create([
                                'category_id' => $category->id,
                                'name' => $subCategoryData['name'],
                                'status' => $subCategoryData['status'] ?? 'active',
                            ]);
                        }
                    }
                }
            }
        });

        return redirect()->route('categories.index')->with('success', 'Categories created successfully!');
    }

    public function edit(Category $category)
    {
        $category->load('subCategories');

        return Inertia::render('Admin/Category/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:active,inactive',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:20048',
            'sub_categories' => 'nullable|array',
            'sub_categories.*.name' => 'required|string|max:255',
            'sub_categories.*.status' => 'required|in:active,inactive',
        ]);

        try {
            DB::beginTransaction();

            $updateData = [
                'name' => $request->name,
                'status' => $request->status,
                'featured' => $request->featured,
            ];

            if ($request->hasFile('image')) {
                Helper::deleteFile($category->image);
                $updateData['image'] = Helper::uploadFile('categories', $request->file('image'));
            }

            $category->update($updateData);

            $submittedSubIds = collect($request->sub_categories)->pluck('id')->filter()->toArray();
            $category->subCategories()->whereNotIn('id', $submittedSubIds)->delete();

            foreach ($request->sub_categories as $subData) {
                $category->subCategories()->updateOrCreate(
                    ['id' => $subData['id'] ?? null],
                    [
                        'name' => $subData['name'],
                        'status' => $subData['status'],
                    ]
                );
            }

            DB::commit();

            return redirect()->route('categories.index')->with('success', 'Category updated successfully!');

        } catch (\Exception $exception) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Operation failed: '.$exception->getMessage()]);
        }
    }

    public function destroy(Category $category)
    {
        try {
            Helper::deleteFile($category->image);
            $category->subCategories()->delete();
            $category->delete();

            return back()->with('success', 'Category deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Delete failed.']);
        }
    }

    public function bulkDestroy(Request $request)
    {
        $selectedIds = $request->input('ids', []);
        $isAllSelected = $request->input('all', false);
        $searchFilter = $request->input('search');

        $targetCategories = Category::query()
            ->when($isAllSelected && $searchFilter, function ($query) use ($searchFilter) {
                $query->where('name', 'like', "%{$searchFilter}%");
            })
            ->when(! $isAllSelected, function ($query) use ($selectedIds) {
                $query->whereIn('id', $selectedIds);
            })
            ->get();

        foreach ($targetCategories as $category) {
            Helper::deleteFile($category->image);
            $category->subCategories()->delete();
            $category->delete();
        }

        return back()->with('success', 'Selected items deleted successfully!');
    }
}
