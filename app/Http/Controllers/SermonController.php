<?php

namespace App\Http\Controllers;

use App\AppMeta;
use App\Http\Resources\Guest\Sermon\SermonCollection;
use App\Http\Resources\Guest\Sermon\SermonShow;
use App\Models\Sermon;
use Illuminate\Http\Request;

class SermonController extends Controller
{
    public function index()
    {
        AppMeta::metas("Sermons", null, "Rehoboth Sermons est notre annuaire officiel où vous trouverez tous nos sermons disponibles.");

        $sermons = new SermonCollection(
            Sermon::query()
                ->latest()
                ->paginate(10)
        );

        return inertia('Sermons/Sermons', [
            'sermons' => $sermons
        ]);
    }

    public function show(Sermon $sermon)
    {
        AppMeta::metas($sermon->subject . " | Sermon", $sermon->image ? $sermon->image->public_path : null, substr($sermon->description, 0, 257));

        return inertia('Sermons/SermonsShow', [
            'sermon' => new SermonShow($sermon)
        ]);
    }
}
