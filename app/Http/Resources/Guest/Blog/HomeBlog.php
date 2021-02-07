<?php

namespace App\Http\Resources\Guest\Blog;

use Illuminate\Http\Resources\Json\JsonResource;

class HomeBlog extends JsonResource
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
            'title' => $this->title,
            'route' => $this->guestRoute(),
            'content' => $this->contentLimit(),
            'date' => $this->date,
            'author' => $this->author
        ];
    }
}
