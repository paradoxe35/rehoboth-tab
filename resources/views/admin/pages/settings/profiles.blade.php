@extends('admin.pages.settings')


@section('app-attr', 'g-component=ProfilesPage')


@section('bottom-body')
@include('admin.pages.settings.profiles.create-modal')
@endsection

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

<div class="d-flex justify-content-end mb-2">
    <button type="button" class="btn btn-sm text-white btn-primary" data-bs-toggle="modal"
        data-bs-target="#new--profile-modal">
        {{ __("Ajouter Profil") }}
    </button>
</div>

<x-livewire.frame ref="tables.settings.profiles-table" />

@endsection