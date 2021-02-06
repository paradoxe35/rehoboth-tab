<?php

namespace App\Http\Livewire\Tables\Settings;

use App\Models\AppOrganizer;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\NumberColumn;


class OrganizersTable extends LivewireDatatable
{
    public $sort = 'desc';

    public $model = AppOrganizer::class;

    public function columns()
    {
        return [
            NumberColumn::name('id'),

            Column::name('name')
                ->editable()
                ->searchable()
                ->label(trans("Nom")),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
