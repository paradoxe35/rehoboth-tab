@extends('admin.main')


@section('content')
<div g-component="HomePage">
    <div class="d-flex justify-content-end mb-2">
        <a href="{{ route('admin.settings.profiles') }}" class="btn btn-sm text-white btn-primary">
            {{ __("Paramètres") }}
        </a>
    </div>
    @include('admin.pages.home.cards')
    <hr>
    @include('admin.pages.home.admins')
</div>
@endsection