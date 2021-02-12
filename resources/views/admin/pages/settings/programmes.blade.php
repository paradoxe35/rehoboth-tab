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
        'name' => "Programmes",
        'active' => true
    ]
]])
@endsection

@section('settings-content')
<div g-component="ProgrammesPage">
    <x-spinner />
</div>
@endsection