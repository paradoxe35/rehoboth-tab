<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\Event\EventCollection as EventsResource;
use App\Http\Resources\Guest\Programme\ProgrammeCollection;
use App\Http\Resources\Guest\Sermon\SermonCollection;
use App\Models\Programme;
use App\Models\Sermon;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(EventRepository $eventRp, Request $request)
    {
        $events = new EventsResource($eventRp->getAvailable()->limit(3)->get());

        $sermons = new SermonCollection(Sermon::query()->latest()->limit(3)->get());

        $programmes = new ProgrammeCollection(Programme::query()->limit(7)->get());

        return inertia('Home/Home', [
            'events' => fn () => $events->toArray($request),
            'sermons' => fn () => $sermons->toArray($request),
            'programmes' => fn () => $programmes->toArray($request),
        ]);
    }
}
