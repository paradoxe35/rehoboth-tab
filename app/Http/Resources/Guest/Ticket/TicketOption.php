<?php

namespace App\Http\Resources\Guest\Ticket;

use Illuminate\Http\Resources\Json\JsonResource;

class TicketOption extends JsonResource
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
            'price' => $this->price,
            'default' => boolval($this->default),
            'reste' => $this->stock - $this->registrations()->count()
        ];
    }
}
