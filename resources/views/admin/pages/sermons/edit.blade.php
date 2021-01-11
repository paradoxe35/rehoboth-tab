@extends('admin.pages.sermons')


@section('sermons-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Sermons',
        'active' => false,
        'link' => route('admin.sermons.index')
    ],
    [
        'name' => "Editer sermon - {$sermon->subject}",
        'active' => true
    ]
]])

<livewire:admin.sermons.edit />

@endsection