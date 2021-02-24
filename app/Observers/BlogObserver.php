<?php

namespace App\Observers;

use App\Models\Blog\Blog;
use App\Models\WebPush;
use App\Notifications\Blog\BlogCreatedNotification;

class BlogObserver
{
    /**
     * Handle the Blog "created" event.
     *
     * @param  \App\Models\Blog\Blog  $blog
     * @return void
     */
    public function created(Blog $blog)
    {
        $notification = new BlogCreatedNotification($blog);
        $notification->delay(3);

        WebPush::all()
            ->each(fn (WebPush $web) => $web->notify($notification));
    }

    /**
     * Handle the Blog "updated" event.
     *
     * @param  \App\Models\Blog\Blog  $blog
     * @return void
     */
    public function updated(Blog $blog)
    {
        //
    }

    /**
     * Handle the Blog "deleted" event.
     *
     * @param  \App\Models\Blog\Blog  $blog
     * @return void
     */
    public function deleted(Blog $blog)
    {
        $blog->image()->get()->each(fn ($img) => $img->delete());
    }

    /**
     * Handle the Blog "restored" event.
     *
     * @param  \App\Models\Blog\Blog  $blog
     * @return void
     */
    public function restored(Blog $blog)
    {
        //
    }

    /**
     * Handle the Blog "force deleted" event.
     *
     * @param  \App\Models\Blog\Blog  $blog
     * @return void
     */
    public function forceDeleted(Blog $blog)
    {
        $blog->image()->get()->each(fn ($img) => $img->delete());
    }
}
