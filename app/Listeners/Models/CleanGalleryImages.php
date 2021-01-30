<?php

namespace App\Listeners\Models;

use App\Events\Models\GalleryDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CleanGalleryImages
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
     * @param  object  $event
     * @return void
     */
    public function handle(GalleryDeleted $event)
    {
        $event->gallery
            ->images()
            ->get()
            ->each(fn ($image) => $image->delete());
    }
}
