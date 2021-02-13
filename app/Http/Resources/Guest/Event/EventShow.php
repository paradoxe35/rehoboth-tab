<?php

namespace App\Http\Resources\Guest\Event;

use App\Http\Resources\Guest\Address\Address;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Guest\Image\Image;
use App\Http\Resources\Guest\Image\ImageCollection;
use App\Http\Resources\Guest\Organizer\OrganizerCollection;
use App\Http\Resources\Guest\Schedule\ScheduleCollection;
use App\Http\Resources\Guest\Tag\TagCollection;
use App\Http\Resources\Guest\Ticket\Ticket;

class EventShow extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'route' => $this->guestRoute(),
            'organizer' => [
                'name' => $this->organizer_name,
                'email' => $this->organizer_email,
                'phone' => $this->organizer_phone
            ],
            'start_date' => $this->start_fdate,
            'end_date' => $this->end_fdate,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'start_datetime' => $this->start_datetime,
            'end_datetime' => $this->end_datetime,
            'image' => (new Image($this->image)),
            'photos' => (new ImageCollection($this->photos)),
            'label' => $this->label,
            'description' => substr(strip_tags($this->text), 0, 257),
            'content' => $this->text,
            'enable_registration' => boolval($this->enable_registration),
            'registration_deadline' => $this->registration_deadline,
            'address' => new Address($this->address),
            'ticket' => new Ticket($this->ticket),
            'schedules' => new ScheduleCollection($this->schedules),
            'tags' => new TagCollection($this->tags),
            'organizers' => new OrganizerCollection($this->organizers),
        ];
    }
}
