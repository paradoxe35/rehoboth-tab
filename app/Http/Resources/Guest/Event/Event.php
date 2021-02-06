<?php

namespace App\Http\Resources\Guest\Event;

use App\Http\Resources\Guest\Image\Image;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class Event extends JsonResource
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
            'end_date' => $this->end_fdate,
            'start_datetime' => $this->start_datetime,
            'end_datetime' => $this->end_datetime,
            'image' => (new Image($this->image))
        ];
    }
}
