@extends('admin.pages.layout-page')


@section('page-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Événements',
        'active' => false,
        'link' => route('admin.events.index')
    ],
    [
        'name' => 'Nouvel évènement',
        'active' => true
    ]
]])


<div g-component="EventCreate">
    <x-spinner />
</div>
@endsection