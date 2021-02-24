<?php

namespace App\Observers;

use App\Models\Morphs\Image;
use Illuminate\Support\Facades\Storage;

class ImageObserver
{
    /**
     * Handle the Image "created" event.
     *
     * @param  \App\Models\Morphs\Image  $image
     * @return void
     */
    public function created(Image $image)
    {
        //
    }

    /**
     * Handle the Image "updated" event.
     *
     * @param  \App\Models\Morphs\Image  $image
     * @return void
     */
    public function updated(Image $image)
    {
        //
    }

    /**
     * Handle the Image "deleted" event.
     *
     * @param  \App\Models\Morphs\Image  $image
     * @return void
     */
    public function deleted(Image $image)
    {
        Storage::delete($image->path);
    }

    /**
     * Handle the Image "restored" event.
     *
     * @param  \App\Models\Morphs\Image  $image
     * @return void
     */
    public function restored(Image $image)
    {
        //
    }

    /**
     * Handle the Image "force deleted" event.
     *
     * @param  \App\Models\Morphs\Image  $image
     * @return void
     */
    public function forceDeleted(Image $image)
    {
        Storage::delete($image->path);
    }
}
