<?php

namespace App\Http\Livewire\Tables;

use App\Models\Blog;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;

class BlogsTable extends LivewireDatatable
{
    public $model = Blog::class;

    public function columns()
    {
        //
    }
}
