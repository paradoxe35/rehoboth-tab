@extends('admin.main')


@section('content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Galerie',
        'active' => false,
        'link' => route('admin.galleries.index')
    ],
    [
        'name' => 'Articles',
        'active' => true
    ]
]])

<div g-component="GalleryArticles">
    <x-livewire.frame ref="tables.galleries-table" />
</div>
@endsection