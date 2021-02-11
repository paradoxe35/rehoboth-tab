<?php

namespace App\Http\Resources\Guest\Schedule;

use Illuminate\Http\Resources\Json\JsonResource;

class Schedule extends JsonResource
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
            'title' => $this->title,
            'start_date' => $this->start_fdate,
            'start_time' => $this->start_time,
            'end_date' => $this->end_fdate,
            'end_time' => $this->end_time
        ];
    }
}
