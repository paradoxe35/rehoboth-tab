<?php

namespace App\Http\Resources\Guest\Ticket;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TicketOptionCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
