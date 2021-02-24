<?php

namespace App\Providers;

use App\Listeners\Models\CleanSermonFiles;
use App\Models\Blog\Blog;
use App\Models\Event\Event as EventModel;
use App\Models\Gallery;
use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use App\Models\Profil;
use App\Models\Sermon;
use App\Observers\BlogObserver;
use App\Observers\EventObserver;
use App\Observers\FileObserver;
use App\Observers\GalleryObserver;
use App\Observers\ImageObserver;
use App\Observers\ProfilObserver;
use App\Observers\SermonObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Blog::observe(BlogObserver::class);
        EventModel::observe(EventObserver::class);
        File::observe(FileObserver::class);
        Gallery::observe(GalleryObserver::class);
        Image::observe(ImageObserver::class);
        Profil::observe(ProfilObserver::class);
        Sermon::observe(SermonObserver::class);
    }


    /**
     * Determine if events and listeners should be automatically discovered.
     *
     * @return bool
     */
    public function shouldDiscoverEvents()
    {
        return true;
    }
}
