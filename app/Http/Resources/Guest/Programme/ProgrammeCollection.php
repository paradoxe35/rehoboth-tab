<?php

namespace App\Http\Resources\Guest\Programme;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ProgrammeCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
