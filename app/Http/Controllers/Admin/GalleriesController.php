<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Http\Resources\Image\ImageCollection;
use App\Models\Gallery;
use App\Models\Morphs\Image;
use Illuminate\Http\Request;

class GalleriesController extends Controller
{

    public function __construct()
    {
        $this->middleware(['optimizeImages']);
    }

    public function index()
    {
        return view('admin.pages.galleries.index');
    }

    public function articles()
    {
        return view('admin.pages.galleries.articles');
    }

    public function getImages()
    {
        $images = Image::query()->latest()->paginate(10);
        return new ImageCollection($images);
    }

    public function store(Request $request)
    {
        $request->validate([
            'images' => ['required'],
            'images.*' => [
                'image',
                'max:' . (5 * 1024),
                'mimes:jpeg,png'
            ],
            'title' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'date' => ['nullable', 'date']
        ]);

        $images = collect();
        $gallery = Gallery::query()->create($request->only(['title', 'description']));

        if ($request->hasfile('images')) {
            foreach ($request->file('images') as $file) {
                $uploaded = $file->storePublicly(File::GALLERY_IMAGES_PATH . "/{$gallery->id}");
                [$width, $height] = getimagesize($file->getPathname());

                $image = $gallery->images()->create([
                    'path' => $uploaded,
                    'width' => $width,
                    'height' => $height,
                    'caption' => $file->getClientOriginalName(),
                    'date' => $request->date
                ]);

                $images->add($image);
            }
        }


        return new ImageCollection($images);
    }
}
