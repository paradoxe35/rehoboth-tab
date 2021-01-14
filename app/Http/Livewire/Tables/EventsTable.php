<?php

namespace App\Http\Livewire\Tables;

use App\Models\Event\Event;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class EventsTable extends LivewireDatatable
{
    public $model = Event::class;

    public $hideable = 'select';


    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::name('name')
                ->truncate()
                ->editable()
                ->searchable()
                ->label(trans("Nom de l'événement")),

            Column::name('label')
                ->truncate()
                ->editable()
                ->label(trans("Label")),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Ajouté le')),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
