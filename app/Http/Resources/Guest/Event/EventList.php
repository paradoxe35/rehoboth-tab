<?php

namespace App\Http\Resources\Guest\Event;

use App\Http\Resources\Guest\Image\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class EventList extends JsonResource
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
            'start_date' => $this->start_fdate,
            'start_time' => $this->start_time,
            'description' => substr(strip_tags($this->text), 0, 257),
            'image' => (new Image($this->image))
        ];
    }
}
