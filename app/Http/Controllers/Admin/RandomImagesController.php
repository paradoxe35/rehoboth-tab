<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Storage;

class RandomImagesController extends Controller
{
    public function __construct()
    {
        $this->middleware(['optimizeImages'])
            ->only(['upload']);
    }



    public function upload(Request $request)
    {
        $request->validate([
            'image' => File::IMAGE_RULES
        ]);

        $file = $request->file('image');

        $uploaded = $file->storePublicly("random-images");

        return [
            "success" => 1,
            "file" => [
                "url" => Storage::url($uploaded)
            ]
        ];
    }

}
