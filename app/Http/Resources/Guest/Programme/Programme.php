<?php

namespace App\Http\Resources\Guest\Programme;

use Illuminate\Http\Resources\Json\JsonResource;

class Programme extends JsonResource
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
            'day' => $this->day,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'description' => $this->description
        ];
    }
}
