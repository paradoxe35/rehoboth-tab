<?php

namespace App\Http\Controllers;

use App\AppMeta;
use App\Http\Resources\Guest\ImageGallery\ImageGalleryListCollection;
use App\Models\Blog\Blog;
use App\Models\Event\Event;
use App\Models\Gallery;
use App\Models\Morphs\Image;
use Butschster\Head\Facades\Meta;
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

        return new ImageGalleryListCollection($images);
    }


    public function index()
    {
        AppMeta::metas('Galerie', null, "" . config('app.name') . " Gallery est la galerie officielle de " . config('app.name') . ". Presque chaque jour, nous y mettons de nouvelles images");

        return inertia('Gallery/Gallery', [
            'images' => $this->images()
        ]);
    }


    public function items()
    {
        return $this->images();
    }
}
