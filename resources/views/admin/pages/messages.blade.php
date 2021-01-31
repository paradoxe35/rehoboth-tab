@extends('admin.main')


@section('content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Messages',
        'active' => true
    ]
]])

<div g-component="MessageIndex">
    <x-livewire.frame ref="tables.messages-table" />
</div>

@endsection