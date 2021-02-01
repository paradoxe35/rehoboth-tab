@extends('admin.pages.settings')


@section('settings-breadcrumb')
@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Paramètres',
        'active' => true
    ],
    [
        'name' => "Profiles",
        'active' => true
    ]
]])
@endsection

@section('settings-content')


@endsection