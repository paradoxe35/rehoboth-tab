@extends('admin.pages.sermons')


@section('sermons-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Événements',
        'active' => true
    ]
]])


<div g-component="EventIndex">
    <div class="d-flex justify-content-end mb-2">
        <a href="{{ route('admin.events.create') }}" class="btn btn-sm text-white btn-primary">
            {{ __("Nouvel évènement") }}
        </a>
    </div>
    
    <x-livewire.frame ref="tables.events-table" />
</div>

@endsection