@extends('admin.main')


@section('content')
<div g-component="HomePage">
    @include('admin.pages.home.cards')
    <hr>
    @include('admin.pages.home.admins')
</div>
@endsection