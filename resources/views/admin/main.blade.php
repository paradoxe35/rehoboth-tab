@extends('app-admin')

@section('body')
@include('admin.header')
<div class="container-fluid">
    <div class="row">
        @include('admin.sidebar')

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="mt-4">
                @yield('content')
            </div>
        </main>
    </div>
</div>
@endsection