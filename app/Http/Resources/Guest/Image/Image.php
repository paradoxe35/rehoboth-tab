<?php

namespace App\Http\Resources\Guest\Image;

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
            'date' => $this->date,
            'thumbnail' => $this->thumbnail,
            'path' => $this->path,
            'public_path' => $this->public_path,
            'imageable' => Str::lower(Str::afterLast($this->imageable_type, '\\')),
        ];
    }
}
