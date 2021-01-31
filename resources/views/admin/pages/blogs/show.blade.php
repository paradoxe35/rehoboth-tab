@extends('admin.main')


@section('content')

@yield('show-breadcrumb')

<x-nav-link :isTab="false" :links="[
            ['name' => 'Profil', 'route' => 'admin.blogs.show.profile'],
            ['name' => 'Contenu', 'route' => 'admin.blogs.show.content'],
            ['name' => 'Commentaires', 'route' => 'admin.blogs.show.comments'],
        ]" />

@yield('show-content')

@endsection