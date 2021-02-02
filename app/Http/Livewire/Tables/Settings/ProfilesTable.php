<?php

namespace App\Http\Livewire\Tables\Settings;

use App\Models\Profil;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class ProfilesTable extends LivewireDatatable
{

    public $sort = 'desc';

    public $model = Profil::class;

    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::name('name')
                ->editable()
                ->searchable()
                ->label(trans("Nom")),

            Column::name('email')
                ->editable()
                ->label(trans("Email")),

            Column::name('phone')
                ->editable()
                ->label(trans("Phone")),

            Column::callback(['id'], function ($id) {
                $profile = Profil::find($id);
                return view('livewire.admin.profiles.table.profile-actions', compact('profile'));
            })->label(trans('Profil')),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }
}
