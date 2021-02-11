<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\Event\EventListCollection;
use App\Http\Resources\Guest\Event\EventShow;
use App\Models\Event\Event;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(EventRepository $eventRp)
    {

        $events = new EventListCollection(
            $eventRp->getAvailable()
                ->paginate(6)
        );

        return inertia('Events/Events', [
            'events' => $events
        ]);
    }


    public function show(Event $event)
    {
        return inertia('Events/EventsShow', [
            'event' => new EventShow($event)
        ]);
    }
}
