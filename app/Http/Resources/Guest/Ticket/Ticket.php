<?php

namespace App\Http\Resources\Guest\Ticket;

use Illuminate\Http\Resources\Json\JsonResource;

class Ticket extends JsonResource
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
            'type' => $this->type,
            'remaining' => boolval($this->remaining),
            'options' => new TicketOptionCollection($this->options)
        ];
    }
}
