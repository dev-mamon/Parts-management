<?php

namespace App\Http\Controllers\User\Blog;

use App\Helpers\Helper;
use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Display a listing of the blogs for users.
     */
    public function index(Request $request)
    {
        $blogs = Blog::query()
            ->when($request->search, function ($q, $search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate($request->per_page ?? 7)
            ->withQueryString()
            ->through(fn ($blog) => [
                'id' => $blog->id,
                'title' => $blog->title,
                'content' => $blog->content,
                'author' => $blog->author,
                'category' => $blog->category,
                'created_at' => $blog->created_at->format('M d, Y'),
                'image_url' => Helper::generateURL($blog->image),
            ]);

        return Inertia::render('User/Blog/Index', [
            'blogs' => $blogs,
            'filters' => $request->only(['search', 'per_page']),
        ]);
    }

    /**
     * Display the specified blog.
     */
    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->image_url = Helper::generateURL($blog->image);
        $blog->formatted_date = $blog->created_at->format('M d, Y');

        // Fetch related blogs
        $relatedBlogs = Blog::where('id', '!=', $id)
            ->where('category', $blog->category)
            ->take(3)
            ->get()
            ->map(fn ($b) => [
                'id' => $b->id,
                'title' => $b->title,
                'created_at' => $b->created_at->format('M d, Y'),
                'image_url' => Helper::generateURL($b->image),
            ]);

        return Inertia::render('User/Blog/Show', [
            'blog' => $blog,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }
}
