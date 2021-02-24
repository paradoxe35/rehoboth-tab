<?php

namespace App\Observers;

use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use App\Models\Sermon;
use App\Models\WebPush;
use App\Notifications\Sermon\SermonCreatedNotification;

class SermonObserver
{
    /**
     * Handle the Sermon "created" event.
     *
     * @param  \App\Models\Sermon  $sermon
     * @return void
     */
    public function created(Sermon $sermon)
    {
        WebPush::all()
            ->each(fn (WebPush $web) => $web->notify(new SermonCreatedNotification($sermon)));
    }

    /**
     * Handle the Sermon "updated" event.
     *
     * @param  \App\Models\Sermon  $sermon
     * @return void
     */
    public function updated(Sermon $sermon)
    {
        //
    }

    /**
     * Handle the Sermon "deleted" event.
     *
     * @param  \App\Models\Sermon  $sermon
     * @return void
     */
    public function deleted(Sermon $sermon)
    {
        $this->deletetion($sermon);
    }


    private function deletetion(Sermon $sermon)
    {
        $sermon->image()->get()->each(fn ($img) => $img->delete());

        $sermon->files()->get()->each(fn ($fl) => $fl->delete());
    }

    /**
     * Handle the Sermon "restored" event.
     *
     * @param  \App\Models\Sermon  $sermon
     * @return void
     */
    public function restored(Sermon $sermon)
    {
        //
    }

    /**
     * Handle the Sermon "force deleted" event.
     *
     * @param  \App\Models\Sermon  $sermon
     * @return void
     */
    public function forceDeleted(Sermon $sermon)
    {
        $this->deletetion($sermon);
    }
}
