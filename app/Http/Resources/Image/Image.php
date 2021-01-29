<?php

namespace App\Http\Resources\Image;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

class Image extends JsonResource
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
            'height' => $this->height,
            'width' => $this->width,
            'type' => $this->type,
            'caption' => $this->caption,
            'path' => $this->path,
            'public_path' => $this->public_path,
            'imageable' => Str::lower(Str::afterLast($this->imageable_type, '\\'))
        ];
    }
}
