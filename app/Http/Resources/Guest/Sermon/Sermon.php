<?php

namespace App\Http\Resources\Guest\Sermon;

use App\Http\Resources\Guest\File\File;
use App\Http\Resources\Guest\File\FileCollection;
use App\Http\Resources\Guest\Image\Image;
use Illuminate\Http\Resources\Json\JsonResource;

class Sermon extends JsonResource
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
            'route' => $this->guestRoute(),
            'subject' => $this->subject,
            'preacher' => $this->preacher,
            'date' => $this->f_date,
            'media' => [
                'video' => $this->video ? new File($this->video) : null,
                'audios' => new FileCollection($this->audios),
                'documents' => new FileCollection($this->documents),
            ],
            'image' => $this->image ? new Image($this->image) : null
        ];
    }
}
