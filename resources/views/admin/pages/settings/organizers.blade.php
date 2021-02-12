@extends('admin.pages.settings')


@section('settings-breadcrumb')
@include('admin.breadcrumb', ['items' => [
     [
        'name' => 'Acceuil',
        'active' => false,
        'link' => route('admin.home')
    ],
    [
        'name' => 'Paramètres',
        'active' => true
    ],
    [
        'name' => "Organisateurs",
        'active' => true
    ]
]])
@endsection

@section('settings-content')

<x-livewire.frame ref="tables.settings.organizers-table" />

@endsection