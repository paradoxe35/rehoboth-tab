<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\Sermon\SermonCollection;
use App\Models\Sermon;
use Illuminate\Http\Request;

class SermonController extends Controller
{
    public function index()
    {
        $sermons = new SermonCollection(
            Sermon::query()
                ->latest()
                ->paginate(10)
        );

        return inertia('Sermons/Sermons', [
            'sermons' => fn () => $sermons
        ]);
    }
}
