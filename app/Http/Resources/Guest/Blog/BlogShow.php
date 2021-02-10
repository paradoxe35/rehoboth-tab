<?php

namespace App\Http\Resources\Guest\Blog;

use App\Http\Resources\Guest\BlogCategory\BlogCategory;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Guest\Image\Image;

class BlogShow extends JsonResource
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
            'content' => $this->json,
            'date' => $this->date,
            'author' => $this->author,
            'category' => $this->blogCategory ? new BlogCategory($this->blogCategory) : null,
            'description' => $this->description,
            'image' => new Image($this->image)
        ];
    }
}
