<?php

namespace App\Http\Livewire\Tables;

use App\Models\Gallery;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\TimeColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class GalleriesTable extends LivewireDatatable
{
    public $sort = 'desc';

    public $model = Gallery::class;

    public function columns()
    {
        return [
            NumberColumn::name('id'),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Ajouté le')),

            Column::callback(['created_at', 'id'], fn ($created_at, $id) => $created_at)
                ->label(trans('Date')),

            Column::name('title')
                ->editable()
                ->searchable()
                ->label(trans("Nom de la galerie")),

            Column::name('description')
                ->editable()
                ->label(trans("Description")),

            Column::callback(['id'], function ($id) {
                /** @var \App\Models\Gallery */
                $model = Gallery::find($id);

                return view(
                    'livewire.admin.galleries.table.images',
                    ['images' => $model->images]
                );
            })->label(trans("Images")),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
