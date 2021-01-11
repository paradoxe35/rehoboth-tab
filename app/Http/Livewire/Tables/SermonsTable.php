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

            Column::name('subject')
                ->truncate()
                ->editable()
                ->searchable()
                ->label(trans("Sujet")),

            Column::name('preacher')
                ->editable()
                ->label(trans('Prédicateur')),

            Column::callback(['id'], function ($id) {
                /** @var \App\Models\Sermon */
                $model = Sermon::find($id);

                $video = $model->video()->first();
                $audios = $model->audios()->get();
                $documents = $model->documents()->get();

                return view('livewire.admin.sermons.table.media-actions', [
                    'video' => $video,
                    'audios' => $audios,
                    'documents' => $documents
                ]);
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
