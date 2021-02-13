<?php

namespace App\Http\Livewire\Tables\Events;

use App\Models\Event\Event;
use App\Models\Event\EventRegistration;
use App\Models\Morphs\Ticket\TicketOption;
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
            NumberColumn::name('id'),

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
                ->label(trans("Identifiant d'autorisation")),

            Column::callback(['ticket_option_id'], function ($ticket_option_id) {
                $ticket = TicketOption::find($ticket_option_id);
                return $ticket ? "{$ticket->name} \${$ticket->price}" : trans('Gratuit');
            })->label(trans("Ticket")),

            BooleanColumn::name('paid')->label(trans('Payé')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Enregistré le')),

            Column::callback(['id', 'ticket_option_id', 'paid'], function ($id, $ticket_option_id, $paid) {
                $ticket = TicketOption::find($ticket_option_id);
                return $ticket ? view('livewire.admin.events.table.action-registrations', [
                    'id' => $id,
                    'paid' => $paid
                ]) : '--';
            })->alignCenter()->label(trans("Action")),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }


    public function paymentAction($id)
    {
        $reg = EventRegistration::find($id);
        if (!$reg) return;
        $reg->paid = !$reg->paid;
        $reg->save();
    }
}
