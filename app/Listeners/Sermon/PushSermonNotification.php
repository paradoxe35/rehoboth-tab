<?php

namespace App\Listeners\Sermon;

use App\Events\Sermon\SermonCreated;
use App\Models\WebPush;
use App\Notifications\Sermon\SermonCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PushSermonNotification
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
    public function handle(SermonCreated $event)
    {
        $this->webPush->all()
            ->each(fn (WebPush $web) => $web->notify(new SermonCreatedNotification($event->sermon)));
    }
}
