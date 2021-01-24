@extends('admin.main')


@section('content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Galerie',
        'active' => true
    ]
]])



<div g-component="GalleriesIndex">
    <x-spinner />
</div>
@endsection