@extends('admin.pages.sermons')


@section('sermons-content')

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


@endsection