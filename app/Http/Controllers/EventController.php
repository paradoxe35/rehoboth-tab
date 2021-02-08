<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\Event\EventListCollection;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index(EventRepository $eventRp)
    {

        $events = new EventListCollection(
            $eventRp->getAvailable()
                ->paginate(2)
        );

        return inertia('Events/Events', [
            'events' => fn () => $events
        ]);
    }
}
