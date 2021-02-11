<?php

namespace App\Http\Resources\Guest\ChurchDetails;

use App\Http\Resources\Guest\Address\Address;
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
            'address' => $this->address ? new Address($this->address) : null
        ];
    }
}
