@extends('admin.pages.layout-page')


@section('page-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Sermons',
        'active' => false,
        'link' => route('admin.sermons.index')
    ],
    [
        'name' => 'Ajouter sermon',
        'active' => true
    ]
]])

<livewire:admin.sermons.create />

@endsection