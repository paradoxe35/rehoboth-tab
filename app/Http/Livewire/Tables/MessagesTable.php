<?php

namespace App\Http\Livewire\Tables;

use App\Models\Message;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;
use Mediconesystems\LivewireDatatables\BooleanColumn;

class MessagesTable extends LivewireDatatable
{
    public $sort = 'desc';

    public $model = Message::class;

    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::name('email')
                ->truncate()
                ->filterable()
                ->label(trans("Email")),

            Column::name('phone')
                ->filterable()
                ->label(trans("Phone")),

            Column::name('country_name')
                ->filterable()
                ->label(trans("Pays")),

            BooleanColumn::name('sent')
                ->label(trans("Envoyé")),

            BooleanColumn::name('read')
                ->label(trans("Déjà Lu")),

            Column::callback(['id'], function ($id) {
                $message = Message::find($id);
                return view('livewire.admin.messages.table.message', compact('message'));
            })->label(trans('Message')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Ajouté le')),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
