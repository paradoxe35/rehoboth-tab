<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\Event\EventListCollection;
use App\Http\Resources\Guest\Event\EventShow;
use App\Http\Resources\Guest\Ticket\TicketOptionCollection;
use App\Models\Event\Event;
use App\Repositories\EventRepository;
use App\Rules\ValidPhone;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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

    public function uniqueField($event)
    {
        return Rule::unique('event_registrations')->where(function ($query) use ($event) {
            return $query->where('event_id', $event->id);
        });
    }

    public function registrations(Event $event, Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'min:2', 'max:255'],
            'email' => [
                'required', 'email', 'max:255',
                $this->uniqueField($event)
            ],
            'phone' => [
                'required', new ValidPhone, 'max:255',
                $this->uniqueField($event)
            ],
            'ticket_option_id' => ['nullable', 'numeric', 'min:1']
        ]);

        $reg = $event->registrations()->create($data);
        $regId = random_int(10000, 99999) . "" . $event->id;

        $reg->regid = $regId;
        $reg->save();

        $message = "Votre inscription à l'événement :event a bien été effectuée";

        return [
            'message' => trans($message, ['event' => $event->name]),
            'reg_id' => $regId,
            'tickets' => new TicketOptionCollection($event->ticket->options)
        ];
    }
}
