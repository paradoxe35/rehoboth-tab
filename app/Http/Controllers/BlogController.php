<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\Blog\BlogListCollection;
use App\Http\Resources\Guest\BlogCategory\BlogCategoryCollection;
use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $blogsData = null;
        $all = true;
        $category = null;

        if ($category = $request->query('category')) {
            $ctg = BlogCategory::find($category);
            if ($ctg) {
                $all = false;
                $blogsData = $ctg->blogs()->latest()->paginate(10);
            }
        }

        if ($all) {
            $blogsData = Blog::query()->latest()->paginate(10);
        }

        $categories = new BlogCategoryCollection(
            BlogCategory::query()->get()
        );

        $blogs = new BlogListCollection($blogsData);

        return inertia('Blog/Blog', [
            'categories' => $categories,
            'blogs' => $blogs,
            'category' => $category
        ]);
    }
}
