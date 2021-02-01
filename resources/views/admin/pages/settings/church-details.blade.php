@extends('admin.pages.settings')


@section('settings-breadcrumb')
@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Paramètres',
        'active' => true
    ],
    [
        'name' => "Détails de l'église",
        'active' => true
    ]
]])
@endsection

@section('settings-content')


@endsection