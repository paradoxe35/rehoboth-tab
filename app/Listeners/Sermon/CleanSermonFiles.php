<?php

namespace App\Listeners\Sermon;

use App\Events\Sermon\SermonDeleted;
use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Storage;

class CleanSermonFiles
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  SermonDeleted  $event
     * @return void
     */
    public function handle(SermonDeleted $event)
    {
        $event->sermon->image()->get()
            ->each(function (Image $image) {
                $image->delete();
            });

        $event->sermon->files()->get()
            ->each(function (File $file) {
                $file->delete();
            });
    }
}
