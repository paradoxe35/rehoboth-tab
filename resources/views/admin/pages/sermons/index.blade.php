@extends('admin.pages.layout-page')


@section('page-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Sermons',
        'active' => true
    ]
]])

<div g-component="SermonIndex">
    <div class="d-flex justify-content-end mb-2">
        <a href="{{ route('admin.sermons.create') }}" class="btn btn-sm text-white btn-primary">
            {{ __("Ajouter sermon") }}
        </a>
    </div>
    
    <x-livewire.frame ref="tables.sermons-table" />
</div>

@endsection