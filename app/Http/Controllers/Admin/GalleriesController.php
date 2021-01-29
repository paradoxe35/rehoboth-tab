<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Image\ImageCollection;
use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use Illuminate\Http\Request;

class GalleriesController extends Controller
{
    public function index()
    {
        return view('admin.pages.galleries');
    }

    public function getImages()
    {
        $images = Image::query()->latest()->paginate(16);

        return new ImageCollection($images);
    }
}
