@extends('admin.pages.blogs.show')


@section('show-breadcrumb')
@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Blogs',
        'active' => false,
        'link' => route('admin.blogs.index')
    ],
    [
        'name' => "Contenu - {$blog->title}",
        'active' => true
    ]
]])
@endsection


@section('show-content')
<div g-component="BlogContent">
    <div class="row justify-content-center mb-3">
        <div class="col-lg-6">
            <img class="img-thumbnail object-fit--cover" src="{{ $blog->image->public_path }}"
            alt="{{ $blog->title }}">
        </div>
    </div>

    <x-card>
        <div class="acticle-blog" g-ref="content"></div>
    </x-card>
</div>
<script type="text/javascript" data-swup-reload-script>
    window.article_json = JSON.parse(@json($blog->json))
</script>
@endsection