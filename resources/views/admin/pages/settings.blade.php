@extends('admin.main')


@section('content')

@yield('settings-breadcrumb')

<x-nav-link :isTab="false" :links="[
            ['name' => 'Profils', 'route' => 'admin.settings.profiles'],
            ['name' => 'Détails de l\'église', 'route' => 'admin.settings.church-details'],
        ]" />

@yield('settings-content')

@endsection