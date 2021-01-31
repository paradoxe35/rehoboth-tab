<?php

namespace App\Http\Livewire\Tables;

use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class BlogsTable extends LivewireDatatable
{
    public $sort = 'desc';

    public $model = Blog::class;

    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::name('title')
                ->truncate(20)
                ->searchable()
                ->label(trans("Titre")),

            Column::name('views')
                ->label(trans("Vues")),

            Column::name('author')
                ->editable()
                ->label(trans("Auteur")),

            Column::name('blogCategory.name')
                ->filterable($this->categories->pluck('name'))
                ->label('Catégorie'),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Ajouté le')),

            Column::callback(['id', 'views'], function ($id, $views) {
                return view('livewire.tables.actions.edit-route', [
                    'route' => route('admin.blogs.create', ['article' => $id], false)
                ]);
            })->label(trans('Editer')),

            Column::callback(['id'], function ($id) {
                return view('livewire.tables.actions.show-route', [
                    'route' => route('admin.blogs.show', ['blog' => $id], false)
                ]);
            })->label(trans('Profil')),

            Column::delete()
                ->alignCenter()
                ->label(trans('Supprimer')),
        ];
    }


    public function getCategoriesProperty()
    {
        return BlogCategory::all();
    }
}
