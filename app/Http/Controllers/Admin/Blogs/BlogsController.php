<?php

namespace App\Http\Controllers\Admin\Blogs;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BlogsController extends Controller
{

    public function __construct()
    {
        $this->middleware(['optimizeImages']);

        $this->middleware(function (Request $request, \Closure $next) {
            URL::defaults([
                'blog' => $request->route()->originalParameter('blog')
            ]);

            return $next($request);
        })->except(['index', 'create']);
    }

    public function index()
    {
        return view('admin.pages.blogs.index');
    }


    public function create()
    {
        $categories = BlogCategory::query()->latest()->get();

        $blog = null;
        if ($id = request('article')) {
            $blog = Blog::findOrFail($id);
        }

        return view('admin.pages.blogs.create', compact('categories', 'blog'));
    }


    /**
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'min:5', 'max:255', 'unique:blogs'],
            'author' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:5', 'max:255'],
            'category' => ['required', 'numeric', 'min:1'],
            'image' => File::IMAGE_RULES,
            'json' => ['required', 'json']
        ]);

        $blog = Blog::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'json' => $request->json,
            'description' => $request->description,
            'author' => $request->author,
            'blog_category_id' => $request->category
        ]);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $this->storeImage($file, $blog);
        }

        return [
            'message' => trans("L'article a été créé avec succès"),
            'redirect_url' => route('admin.blogs.show', ['blog' => $blog->id], false)
        ];
    }


    private function storeImage($file, Blog $blog)
    {
        File::storeImageMorph(
            $file,
            File::BLOG_IMG_PATH,
            $blog->image(),
            $blog,
            'cover',
        );
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => [
                'required',
                'string',
                'min:5',
                'max:255',
                Rule::unique('blogs')->ignore($blog->id)
            ],
            'author' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'numeric', 'min:1'],
            'image' => File::IMAGE_RULES_OPTIONAL,
            'json' => ['required', 'json']
        ]);

        $blog->fill([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'json' => $request->json,
            'description' => $request->description,
            'author' => $request->author,
            'blog_category_id' => $request->category
        ])->save();

        if ($request->hasFile('image')) {
            $blog->image->delete();

            $file = $request->file('image');
            $this->storeImage($file, $blog);
        }

        return [
            'message' => trans("L'article a été modifié avec succès"),
            'redirect_url' => route('admin.blogs.create', ['article' => $blog->id], false)
        ];
    }


    /**
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return redirect(route('admin.blogs.show.profile'));
    }


    /**
     * @return \Illuminate\Http\Response
     */
    public function showProfile(Blog $blog)
    {
        return view('admin.pages.blogs.show.profile', compact('blog'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function showContent(Blog $blog)
    {
        return view('admin.pages.blogs.show.content', compact('blog'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function showComments(Blog $blog)
    {
        return view('admin.pages.blogs.show.comments', compact('blog'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();
        return [
            'redirect_url' => route('admin.blogs.index', [], false)
        ];
    }
}
