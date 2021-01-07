<?php

namespace App\Http\Livewire\Tables;

use App\Models\Sermon;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class SermonsTable extends LivewireDatatable
{
    public $hideable = 'select';


    public $model = Sermon::class;


    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::name('title')
                ->truncate()
                ->searchable()
                ->label(trans("Thème")),

            Column::name('author')
                ->label(trans('Prédicateur')),

            Column::callback(['video', 'audio', 'document'], function ($video, $audio, $document) {
                return 'media';
            })->label(trans('Media')),

            DateColumn::name('date')
                ->filterable()
                ->label(trans('Prêché le')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Ajouté le')),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
