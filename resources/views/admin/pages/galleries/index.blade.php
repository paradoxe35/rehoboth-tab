@extends('admin.main')


@section('content')

<div class="row">
    <div class="col">
        @include('admin.breadcrumb', ['items' =>
        [
        [
        'name' => 'Galerie',
        'active' => true
        ]
        ], 'hr' => false])
    </div>
    <div class="col-auto">
        <a href="{{ route('admin.galleries.articles') }}" class="btn btn-sm text-white btn-primary">
            {{ __("Articles") }}
        </a>
    </div>
</div>
<hr>

<div g-component="GalleryIndex">
    <x-spinner />
</div>
@endsection