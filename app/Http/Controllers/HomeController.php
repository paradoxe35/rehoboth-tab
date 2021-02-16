<?php

namespace App\Http\Controllers;

use App\AppMeta;
use App\Http\Resources\Guest\Blog\HomeBlogCollection;
use App\Http\Resources\Guest\Event\EventCollection as EventsResource;
use App\Http\Resources\Guest\ImageGallery\ImageGalleryCollection;
use App\Http\Resources\Guest\Programme\ProgrammeCollection;
use App\Http\Resources\Guest\Sermon\SermonCollection;
use App\Models\Blog\Blog;
use App\Models\Gallery;
use App\Models\Morphs\Image;
use App\Models\Programme;
use App\Models\Sermon;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(EventRepository $eventRp)
    {

        AppMeta::metas(null, null, 'default');

        $events = new EventsResource(
            $eventRp->getAvailable()->limit(3)->get()
        );

        $sermons = new SermonCollection(
            Sermon::query()->latest()->limit(3)->get()
        );

        $programmes = new ProgrammeCollection(
            Programme::query()->limit(7)->get()
        );

        $images = new ImageGalleryCollection(
            Image::query()
                ->where('imageable_type', Gallery::class)
                ->latest()
                ->limit(10)
                ->get()
        );

        $blogs = new HomeBlogCollection(
            Blog::query()->latest()->limit(3)->get()
        );

        return inertia('Home/Home', [
            'events' => $events,
            'sermons' => $sermons,
            'programmes' => $programmes,
            'images' => $images,
            'blogs' => $blogs,
        ]);
    }
}
