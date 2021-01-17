<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\AppOrganizer;
use App\Models\AppTag;
use App\Models\Event\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


define('TICKET_FREE', 'free');
define('TICKET_PAID', 'paid');


class EventsController extends Controller
{

    private $regTime = "regex:/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/";

    public function __construct()
    {
        $this->middleware(['optimizeImages'])->only(['store']);
    }

    public function index()
    {
        return view('admin.pages.events.index');
    }

    public function create()
    {
        return view('admin.pages.events.create');
    }


    private function validateDetails(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:3'],
            'start_date' => ['required', 'date'],
            'start_time' => ['required', 'string', $this->regTime],
            'end_date' => ['required', 'date'],
            'end_time' => ['required', 'string', $this->regTime],
            'registration' => ['required', 'boolean'],
            'registration_deadline' => ['required_if:registration,true', 'nullable', 'date'],
            'map' => ['required', 'boolean'],
            'lat' => ['required_if:map,true', 'nullable', 'regex:/^(-?\d+(\.\d+)?)$/'],
            'lng' => ['required_if:map,true', 'nullable', 'regex:/^(-?\d+(\.\d+)?)$/'],

            'address' => ['required', 'string'],
            'venue' => ['required', 'string'],
            'city' => ['required', 'string'],
            'country' => ['required', 'string'],
            'state' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $start = strtotime("{$data['start_date']} {$data['start_time']}");
        $end = strtotime("{$data['end_date']} {$data['end_time']}");

        if ($end <= $start) {
            abort(422, trans("La date de fin doit être postérieure à la date de début"));
        }

        return $data;
    }


    private function validateTickets(Request $request)
    {
        $options = $request->get('options');
        $type = $request->get('type');

        if ($type == TICKET_FREE) {
            return $options;
        }

        foreach ($options as $key => $option) {
            if (strlen(trim($option['name'])) > 1) {
                $price = str_replace('$', '', $option['price']);
                if (!is_numeric($price)) {
                    abort(422, trans("La section tickets avec :key, format prix invalid", ['key' => $key]));
                }

                if (!is_numeric($option['stock'])) {
                    abort(422, trans("La section tickets avec :key, format stock invalid", ['key' => $key]));
                }
            }
        }

        return $options;
    }

    private function validateSchedules(Request $request)
    {
        $options = $request->get('options');

        foreach ($options as $key => $option) {
            if (strlen(trim($option['title'])) > 1) {
                $start = strtotime("{$option['start_date']} {$option['start_time']}");
                $end = strtotime("{$option['end_date']} {$option['end_time']}");

                if (!$end || !$start) {
                    abort(422, trans("La section programmes avec :key, champs invalids", ['key' => $key]));
                }

                if ($end <= $start) {
                    abort(
                        422,
                        trans("La section programmes avec :key, La date de fin doit être postérieure à la date de début", ['key' => $key])
                    );
                }
            }
        }

        return $options;
    }

    private function saveDetails(Request $request): Event
    {
        $details = $request->get('details');

        $event = Event::query()->create([
            'name' => $details['name'],
            'text' => $details['description'] ?? null,
            'start_date' => $details['start_date'],
            'start_time' => $details['start_time'],
            'end_date' => $details['end_date'],
            'end_time' => $details['end_time'],
            'enable_registration' => boolval($details['registration']),
            'registration_deadline' => $details['registration_deadline'] ?? null
        ]);


        $event->address()->create([
            'venue' => $details['venue'],
            'address' => $details['address'],
            'city' => $details['city'],
            'state' => $details['state'],
            'country' => $details['country'],
            'map' => boolval($details['map']),
            'longitude' => $details['lng'] ?? null,
            'latitude' => $details['lat'] ?? null
        ]);

        return $event;
    }

    private function saveTickets(Request $request, Event $event)
    {
        $tickets = $request->get('tickets');
        $t_type = $tickets['type'];
        $t_options = $tickets['options'];


        $ticket = $event->ticket()->create([
            'type' => $t_type
        ]);

        if ($t_type != TICKET_FREE) {
            foreach ($t_options as $option) {
                if (strlen(trim($option['name'])) > 1) {
                    $ticket->options()->create([
                        'name' => $option['name'],
                        'price' => str_replace('$', '', $option['price']),
                        'stock' => $option['stock'],
                        'default' => boolval($option['default'])
                    ]);
                }
            }
        }
    }

    private function saveSchedules(Request $request, Event $event)
    {
        $schedules = $request->get('schedules');

        foreach ($schedules['options'] as $option) {
            if (strlen(trim($option['title'])) > 1) {
                $event->schedules()->create([
                    'title' => $option['title'],
                    'start_date' => $option['start_date'],
                    'start_time' => $option['start_time'],
                    'end_date' => $option['end_date'],
                    'end_time' => $option['end_time']
                ]);
            }
        }
    }

    private function saveOtherInfo(Request $request, Event $event)
    {
        $oinfo = $request->get('other_info');

        $event->refresh();

        $event->label = $oinfo['label'];
        $event->ticket->remaining = boolval($oinfo['remaining_tickets']);

        $event->ticket->save();
        $event->save();

        if (isset($oinfo['organizers']) && is_array($oinfo['organizers'])) {
            foreach ($oinfo['organizers'] as $organizer) {
                $create = ['name' => $organizer['value']];
                $event->organizers()->create($create);

                if (isset($organizer['__isNew__']) && boolval($organizer['__isNew__'])) {
                    AppOrganizer::create($create);
                }
            }
        }

        if (isset($oinfo['tags']) && is_array($oinfo['tags'])) {
            foreach ($oinfo['tags'] as $tag) {
                $create = ['name' => $tag['value']];
                $event->tags()->create($create);

                if (isset($tag['__isNew__']) && boolval($tag['__isNew__'])) {
                    AppTag::create($create);
                }
            }
        }
    }


    private function saveEvent(Request $request)
    {
        $event = $this->saveDetails($request);

        $this->saveTickets($request, $event);
        $this->saveSchedules($request, $event);
        $this->saveOtherInfo($request, $event);

        return [
            'event' => $event
        ];
    }

    private function savePhotos(Request $request)
    {
        $request->validate([
            'cover' => [
                'required',
                'image',
                'max:' . (5 * 1024),
                'mimes:jpeg,png'
            ],
            'photos.*' => [
                'nullable',
                'image',
                'max:' . (5 * 1024),
                'mimes:jpeg,png'
            ],
        ]);

        $event = Event::query()->findOrFail($request->query('event_id'));

        if ($request->hasfile('cover')) {
            $file = $request->file('cover');

            $uploaded = $file->storePublicly(File::EVENTS_COVERS_PATH . "/{$event->id}");
            [$width, $height] = getimagesize($file->getPathname());

            $event->image()->create([
                'path' => $uploaded,
                'width' => $width,
                'height' => $height,
                'caption' => $file->getClientOriginalName()
            ]);
        }

        if ($request->hasfile('photos')) {
            foreach ($request->file('photos') as $file) {
                $uploaded = $file->storePublicly(File::EVENTS_PHOTOS_PATH . "/{$event->id}");
                [$width, $height] = getimagesize($file->getPathname());

                $event->photos()->create([
                    'path' => $uploaded,
                    'type' => 'photo',
                    'width' => $width,
                    'height' => $height,
                    'name' => $file->getClientOriginalName()
                ]);
            }
        }
    }


    public function store(Request $request)
    {
        switch ($request->query('section')) {
            case 'details':
                $res = $this->validateDetails($request);
                break;
            case 'tickets':
                $res = $this->validateTickets($request);
                break;
            case 'schedules':
                $res = $this->validateSchedules($request);
                break;
            case 'save':
                $res = $this->saveEvent($request);
                break;
            case 'pictures':
                $res = $this->savePhotos($request);
                break;
            default:
                abort(400);
                break;
        }

        return $res;
    }


    public function show(Event $event)
    {
        return view('admin.pages.events.show', compact('event'));
    }
}
