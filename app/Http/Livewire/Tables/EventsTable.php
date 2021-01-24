<?php

namespace App\Http\Livewire\Tables;

use App\Models\Event\Event;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\TimeColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class EventsTable extends LivewireDatatable
{
    public $sort = 'desc';

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

            DateColumn::name('start_date')
                ->label(trans("Date de début")),

            TimeColumn::name('start_time')
                ->label(trans("Heure de début")),

            DateColumn::name('end_date')
                ->label(trans("Date de fin")),

            TimeColumn::name('end_time')
                ->label(trans("heure de fin")),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Ajouté le')),

            Column::callback(['id'], function ($id) {
                return view('livewire.tables.actions.show-route', [
                    'route' => route('admin.events.show', ['event' => $id], false)
                ]);
            }),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
