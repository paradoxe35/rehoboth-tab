<?php

namespace App\Http\Controllers\Services;

use App\Http\Controllers\Controller;
use App\Providers\Og\OpenGraph;
use Illuminate\Http\Request;

class OgController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  OpenGraph  $og
     * @return \Illuminate\Http\Response
     */
    public function __invoke(OpenGraph $og)
    {
        $graph = $og::fetch(urldecode(request('url')));
        if (!$graph) {
            return [
                'success' => 0,
                'message' => trans('Invalid Link')
            ];
        }
        return [
            'success' => 1,
            'meta' =>  [
                "title" => $graph->title ?: '',
                "description" => $graph->description ?: '',
                "image" => [
                    "url" => $graph->image ?: ''
                ]
            ]
        ];
    }
}
