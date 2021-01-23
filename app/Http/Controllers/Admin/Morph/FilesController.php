<?php

namespace App\Http\Controllers\Admin\Morph;

use App\Http\Controllers\Controller;
use App\Models\Morphs\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    /**
     * Remove the specified resource from storage.
     *
     * @param  File  $file
     * @return \Illuminate\Http\Response
     */
    public function destroy(File $file)
    {
        $file->delete();

        return $file;
    }
}
