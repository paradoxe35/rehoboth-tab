<?php

namespace App\Http\Livewire\Tables\Events;

use App\Models\Event\Event;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class RegistrationsTable extends LivewireDatatable
{

    public $sort = 'desc';

    public function builder()
    {
        /** @var Event */
        $event = Event::query()->findOrFail($this->params['event'] ?? null);

        return $event->registrations()->getQuery();
    }

    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::name('name')
                ->truncate()
                ->filterable()
                ->label(trans("Nom")),

            Column::name('phone')
                ->filterable()
                ->label(trans("Phone")),

            Column::name('email')
                ->truncate()
                ->label(trans("Email")),

            Column::name('regid')
                ->searchable()
                ->label(trans("ID")),

            Column::callback(['ticket_option'], function ($ticket_option) {
                return $ticket_option ? "{$ticket_option->name} \${$ticket_option->price}" : trans('Gratuit');
            })->label(trans("Ticket")),

            BooleanColumn::name('paid')->label(trans('Payé')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Enregistré le')),

            Column::callback(['id'], function ($id) {
                return '';
            })->label(trans("Action")),
        ];
    }
}
