<?php

namespace App\Http\Livewire\Tables;

use App\Models\Event;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;

class EventsTable extends LivewireDatatable
{
    public $model = Event::class;

    public function columns()
    {
        //
    }
}
