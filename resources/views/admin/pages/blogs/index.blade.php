@extends('admin.main')


@section('content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Blogs',
        'active' => true
    ]
]])


<div g-component="BlogIndex">
    <div class="d-flex justify-content-end mb-2">
        <a href="{{ route('admin.blogs.create') }}" class="btn btn-sm text-white btn-primary">
            {{ __("Nouvel article") }}
        </a>
    </div>
    
    <x-livewire.frame ref="tables.blogs-table" />
</div>

@endsection