<?php

namespace App\Http\Resources\Guest\ChurchDetails;

use Illuminate\Http\Resources\Json\JsonResource;

class ChurchDetails extends JsonResource
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
            'email' => $this->email,
            'phone' => $this->phone,
            'description' => $this->description,
            'address' => $this->address ? [
                'venue' => $this->address->venue,
                'address' => $this->address->address,
                'city' => $this->address->city,
                'state' => $this->address->state,
                'country' => $this->address->country,
                'longitude' => $this->address->longitude,
                'latitude' => $this->address->latitude,
                'map' => $this->address->latitude && $this->address->longitude
            ] : null
        ];
    }
}
