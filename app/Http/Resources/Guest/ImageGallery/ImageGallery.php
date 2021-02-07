<?php

namespace App\Http\Resources\Guest\ImageGallery;

use Illuminate\Http\Resources\Json\JsonResource;

class ImageGallery extends JsonResource
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
            'title' => $this->imageable->title,
            'description' => $this->imageable->description,
        ];
    }
}
