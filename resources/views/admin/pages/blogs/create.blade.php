@extends('admin.main')


@section('app-attr', 'g-component=BlogCreate')


@section('bottom-body')
    @include('admin.pages.blogs.create.previewModal')
    @include('admin.pages.blogs.create.categoriesModal')
@endsection

@section('content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Blogs',
        'active' => false,
        'link' => route('admin.blogs.index')
    ],
    [
        'name' => ($blog ? "Editer article - {$blog->title}" : 'Nouvel article'),
        'active' => true
    ]
]])


@include('admin.pages.blogs.create.form')

<script type="text/javascript" data-swup-reload-script>
    window.article_edit = JSON.parse(@json($blog ? $blog->json : null))
</script>
@endsection