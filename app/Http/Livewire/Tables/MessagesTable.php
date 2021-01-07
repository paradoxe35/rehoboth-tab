<?php

namespace App\Http\Livewire\Tables;

use App\Models\Message;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;

class MessagesTable extends LivewireDatatable
{
    public $model = Message::class;

    public function columns()
    {
        //
    }
}