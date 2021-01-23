<?php

namespace App\Listeners\Models;

use App\Events\Models\EventDeleted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CleanEventDatas
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
    public function handle(EventDeleted $event)
    {
        $ievent = $event->event;

        $ievent->photos()->delete();

        $ievent->image()->delete();

        $ievent->address()->delete();

        $ievent->ticket()->delete();

        $ievent->schedules()->delete();

        $ievent->tags()->delete();

        $ievent->organizers()->delete();
    }
}
