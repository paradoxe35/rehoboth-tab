@extends('admin.main')


@section('content')
<div g-component="HomePage">
    <div class=" justify-content-end mb-2 d-inline-flex">
        <a href="{{ route('admin.settings.profiles') }}" class="btn btn-sm text-white btn-primary">
            {{ __("Paramètres") }}
        </a>
    </div>
    <div class="d-inline-flex justify-content-end mb-2 ml-5">
        <a href="/admin" class="btn btn-sm text-white btn-primary">
            {{ __("Administration facile") }}
        </a>
    </div>
    @include('admin.pages.home.cards')
    <hr>
    @include('admin.pages.home.admins')
</div>
@endsection
