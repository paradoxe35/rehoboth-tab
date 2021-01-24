<?php

namespace App\Http\Livewire\Tables;

use App\Models\Gallery;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;

class GalleriesTable extends LivewireDatatable
{
    public $sort = 'desc';

    public $model = Gallery::class;

    public function columns()
    {
        //
    }
}
