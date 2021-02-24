<?php

namespace App\Observers;

use App\Models\Event\Event;
use App\Models\WebPush;
use App\Notifications\Event\EventCreatedNotification;

class EventObserver
{
    /**
     * Handle the Event "created" event.
     *
     * @param  \App\Models\Event\Event  $event
     * @return void
     */
    public function created(Event $event)
    {
        WebPush::all()
            ->each(fn (WebPush $web) => $web->notify(new EventCreatedNotification($event)));
    }

    /**
     * Handle the Event "updated" event.
     *
     * @param  \App\Models\Event\Event  $event
     * @return void
     */
    public function updated(Event $event)
    {
        //
    }

    /**
     * Handle the Event "deleted" event.
     *
     * @param  \App\Models\Event\Event  $event
     * @return void
     */
    public function deleted(Event $event)
    {
        $this->deletetion($event);
    }



    private function deletetion(Event $event)
    {
        $event->images()->get()->each(fn ($img) => $img->delete());

        $event->address()->delete();

        $event->ticket()->delete();

        $event->schedules()->delete();

        $event->tags()->delete();

        $event->organizers()->delete();
    }

    /**
     * Handle the Event "restored" event.
     *
     * @param  \App\Models\Event\Event  $event
     * @return void
     */
    public function restored(Event $event)
    {
        //
    }

    /**
     * Handle the Event "force deleted" event.
     *
     * @param  \App\Models\Event\Event  $event
     * @return void
     */
    public function forceDeleted(Event $event)
    {
        $this->deletetion($event);
    }
}
