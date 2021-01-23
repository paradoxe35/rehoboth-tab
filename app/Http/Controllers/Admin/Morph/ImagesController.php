<?php

namespace App\Http\Controllers\Admin\Morph;

use App\Http\Controllers\Controller;
use App\Models\Morphs\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImagesController extends Controller
{
    /**
     * Remove the specified resource from storage.
     *
     * @param  Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        $image->delete();

        return $image;
    }
}
