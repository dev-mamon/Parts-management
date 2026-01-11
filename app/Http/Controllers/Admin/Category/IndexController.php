<?php

namespace App\Http\Controllers\Admin\Category;

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
            foreach ($request->categories as $catData) {
                $category = Category::create([
                    'name' => $catData['name'],
                    'slug' => Str::slug($catData['name']),
                    'status' => $catData['status'],
                    'featured' => $catData['featured'] ?? false,
                ]);

                if (! empty($catData['sub_categories'])) {
                    // Change $subName to $subData to avoid confusion
                    foreach ($catData['sub_categories'] as $subData) {
                        // Check if name exists inside the array
                        if (! empty($subData['name'])) {
                            SubCategory::create([
                                'category_id' => $category->id,
                                'name' => $subData['name'], // Access name key
                                'status' => $subData['status'] ?? 'active', // Access status key
                            ]);
                        }
                    }
                }
            }
        });

        return redirect()->route('categories.index')
            ->with('success', 'Categories created successfully!');
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
            'sub_categories' => 'nullable|array',
            'sub_categories.*.name' => 'required|string|max:255',
            'sub_categories.*.status' => 'required|in:active,inactive',
        ]);

        try {
            DB::beginTransaction();
            $category->update([
                'name' => $request->name,
                'status' => $request->status,
                'featured' => $request->featured,
            ]);

            $receivedSubIds = collect($request->sub_categories)->pluck('id')->filter()->toArray();
            $category->subCategories()->whereNotIn('id', $receivedSubIds)->delete();

            if (! empty($request->sub_categories)) {
                foreach ($request->sub_categories as $sub) {

                    $category->subCategories()->updateOrCreate(
                        ['id' => $sub['id'] ?? null],
                        [
                            'name' => $sub['name'],
                            'status' => $sub['status'],
                        ]
                    );
                }
            }

            DB::commit();

            return redirect()->route('categories.index')->with('success', 'Category updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Update failed! '.$e->getMessage()]);
        }
    }

    public function destroy(Category $category)
    {
        try {
            $category->subCategories()->delete();
            $category->delete();

            return back()->with('success', 'Category deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Delete failed!']);
        }
    }

    // Blank Delete Method
    public function bulkDestroy(Request $request)
    {
        $ids = $request->input('ids');
        $allSelected = $request->input('all');
        $search = $request->input('search');

        if ($allSelected) {
            Category::query()
                ->when($search, function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->delete();
        } else {
            Category::whereIn('id', $ids)->delete();
        }

        return back()->with('success', 'Selected items deleted successfully!');
    }
}
