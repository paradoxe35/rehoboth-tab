@extends('admin.pages.blogs.show')


@section('show-breadcrumb')
@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Blogs',
        'active' => false,
        'link' => route('admin.blogs.index')
    ],
    [
        'name' => "Commentaires - {$blog->title}",
        'active' => true
    ]
]])
@endsection

@section('show-content')
<x-card>
    <div class="row justify-content-center">
        <div class="col-lg-8">
            @include('components.telegram.comments', ['pageId' => $blog->id ])
        </div>
    </div>
</x-card>

@endsection