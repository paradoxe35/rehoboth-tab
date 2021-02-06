<?php

namespace App\Http\Resources\Guest\File;

use Illuminate\Http\Resources\Json\JsonResource;

class File extends JsonResource
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
            'public_path' => $this->public_path,
            'path' => $this->path,
        ];
    }
}
