<?php

namespace App\Http\Livewire\Tables;

use App\Models\Blog\Blog;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\TimeColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class BlogsTable extends LivewireDatatable
{
    public $sort = 'desc';

    public $model = Blog::class;

    public function columns()
    {
        return [

        ];
    }
}
