@extends('admin.pages.sermons')


@section('sermons-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Sermons',
        'active' => true
    ]
]])

<div class="d-flex justify-content-end mb-2">
    <a href="{{ route('admin.sermons.create') }}" class="btn btn-sm text-white btn-primary">
        {{ __("Ajouter sermon") }}
    </a>
</div>
<x-livewire.frame ref="tables.sermons-table" />
@endsection