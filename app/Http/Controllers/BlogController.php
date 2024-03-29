<?php

namespace App\Http\Controllers;

use App\AppMeta;
use App\Http\Resources\Guest\Blog\BlogListCollection;
use App\Http\Resources\Guest\Blog\BlogShow;
use App\Http\Resources\Guest\BlogCategory\BlogCategoryCollection;
use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        AppMeta::metas("Blog", null, config('app.name') . " Blog est le blog officiel de " . config('app.name') . ". Chaque jour vous apporte les dernières nouvelles");

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

    public function show(Blog $blog)
    {
        AppMeta::metas($blog->title . " | Blog ", $blog->image->public_path, $blog->contentLimit());

        /** @var mixed */
        $comment =  view('components.telegram.comments', ['pageId' => $blog->id]);

        return inertia('Blog/BlogShow', [
            'blog' => new BlogShow($blog),
            'comment' => $comment->toHtml()
        ]);
    }
}
