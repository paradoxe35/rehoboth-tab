@extends('admin.main')


@section('content')

@yield('settings-breadcrumb')

<x-nav-link :isTab="false" :links="[
            ['name' => 'Profils', 'route' => 'admin.settings.profiles'],
            ['name' => 'Détails de l\'église', 'route' => 'admin.settings.church-details'],
            ['name' => 'Programmes', 'route' => 'admin.settings.programmes']
        ]" />

@yield('settings-content')

@endsection