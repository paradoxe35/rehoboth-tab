<?php

namespace App\Http\Resources\Guest\AppProfile;

use App\Http\Resources\Guest\Image\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class AppProfile extends JsonResource
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
            'name' => $this->name,
            'phone' => $this->phone,
            'email' => $this->email,
            'description' => $this->description,
            'image' => new Image($this->image)
        ];
    }
}
