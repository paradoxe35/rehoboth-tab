<?php

namespace App\Listeners\Blog;

use App\Events\Blog\BlogCreated;
use App\Models\WebPush;
use App\Notifications\Blog\BlogCreatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PushBlogNotification
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
    public function handle(BlogCreated $event)
    {
        $this->webPush->all()
            ->each(fn (WebPush $web) => $web->notify(new BlogCreatedNotification($event->blog)));
    }
}
