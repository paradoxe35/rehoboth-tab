<?php

namespace App\Listeners\Models;

use App\Events\Models\SermonDeleted;
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
            ->each(function ($image) {

                Storage::delete($image->path);

                $image->delete();
            });

        $event->sermon->files()->get()
            ->each(function ($file) {

                Storage::delete($file->path);

                $file->delete();
            });
    }
}
