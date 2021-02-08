<?php

namespace App\Http\Controllers\Admin\Blogs;

use App\Http\Controllers\Controller;
use App\Models\Blog\BlogCategory;
use Illuminate\Http\Request;

class BlogsCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BlogCategory::latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:40', 'unique:blog_categories'],
            'icon' => ['nullable', 'string'],
        ]);

        abort_if(
            $this->index()->count() >= 15,
            422,
            trans("Vous ne pouvez pas enregistrer plus de 15 Catégories")
        );

        BlogCategory::query()->create([
            'name' => $request->name,
            'icon' => $request->icon
        ]);

        return [
            'message' => trans("Catégorie a été créé avec succès"),
            'datas' => $this->index()
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(BlogCategory $blogCategory)
    {
        $blogCategory->delete();

        return $this->index();
    }
}
