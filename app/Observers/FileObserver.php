<?php

namespace App\Observers;

use App\Models\Morphs\File;
use Illuminate\Support\Facades\Storage;

class FileObserver
{
    /**
     * Handle the File "created" event.
     *
     * @param  \App\Models\Morphs\File  $file
     * @return void
     */
    public function created(File $file)
    {
        //
    }

    /**
     * Handle the File "updated" event.
     *
     * @param  \App\Models\Morphs\File  $file
     * @return void
     */
    public function updated(File $file)
    {
        //
    }

    /**
     * Handle the File "deleted" event.
     *
     * @param  \App\Models\Morphs\File  $file
     * @return void
     */
    public function deleted(File $file)
    {
        Storage::delete($file->path);
    }

    /**
     * Handle the File "restored" event.
     *
     * @param  \App\Models\Morphs\File  $file
     * @return void
     */
    public function restored(File $file)
    {
        //
    }

    /**
     * Handle the File "force deleted" event.
     *
     * @param  \App\Models\Morphs\File  $file
     * @return void
     */
    public function forceDeleted(File $file)
    {
        Storage::delete($file->path);
    }
}
