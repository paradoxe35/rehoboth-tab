@extends('admin.pages.layout-page')


@section('page-content')

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

<div g-component="SermonEdit">
    <livewire:admin.sermons.edit :sermon="$sermon" />
</div>

@endsection