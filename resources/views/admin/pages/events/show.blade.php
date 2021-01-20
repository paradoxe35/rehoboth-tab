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

<div g-component="EventShow">
    <livewire:admin.events.show-edit :sermon="$event" />
</div>

@endsection