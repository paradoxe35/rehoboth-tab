<?php

namespace App\Http\Controllers;

use App\Http\Resources\Image\ImageCollection;
use App\Models\Blog\Blog;
use App\Models\Event\Event;
use App\Models\Gallery;
use App\Models\Morphs\Image;
use Illuminate\Http\Request;

class GalleryController extends Controller
{

    private function images()
    {
        $images = Image::query()
            ->where('imageable_type', Event::class)
            ->orWhere('imageable_type', Blog::class)
            ->orWhere('imageable_type', Gallery::class)
            ->latest()
            ->paginate(10);

        return new ImageCollection($images);
    }


    public function index()
    {
        return inertia('Gallery/Gallery', [
            'images' => fn () => $this->images()
        ]);
    }


    public function items()
    {
        return $this->images();
    }
}
