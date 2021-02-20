<?php

namespace App\Listeners\Event;

use App\Events\Event\EventCreated;
use App\Models\WebPush;
use App\Notifications\Event\EventCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PushEventNotification
{
    private $webPush;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct(WebPush $webPush)
    {
        $this->webPush = $webPush;
    }

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(EventCreated $event)
    {
        $this->webPush->all()
            ->each(fn (WebPush $web) => $web->notify(new EventCreatedNotification($event->event)));
    }
}
