@extends('admin.pages.layout-page')


@section('page-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Événements',
        'active' => false,
        'link' => route('admin.events.index')
    ],
    [
        'name' => "Profile - {$event->name}",
        'active' => true
    ]
]])


<script type="text/javascript" data-swup-reload-script>
    window.$event = @json($event)
</script>

<x-nav-tab :tabs='["Profil et edit", ["name" => "Inscriptions ($registrations)", "key" => "inscriptions"]]'>
    <x-slot name="profil_et_edit">
        <div g-component="EventShow">
            <x-spinner />
        </div>
    </x-slot>

    <x-slot name="inscriptions">
        <x-livewire.frame ref="tables.events.registrations-table" event="{{ $event->id }}" />
    </x-slot>
</x-nav-tab>


@endsection