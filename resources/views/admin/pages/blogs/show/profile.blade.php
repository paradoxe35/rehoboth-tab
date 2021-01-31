@extends('admin.pages.blogs.show')


@section('show-breadcrumb')
@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Blogs',
        'active' => false,
        'link' => route('admin.blogs.index')
    ],
    [
        'name' => "Profil - {$blog->title}",
        'active' => true
    ]
]])
@endsection

@section('show-content')
<div g-component="BlogProfile">
    <x-card>
        <table class="text-sm table table-responsive">
            <tr>
                <th>
                    {{ __("Titre") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $blog->title }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Vues") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $blog->views }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Créé") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $blog->created_at }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Description") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $blog->description }}
                    </span>
                </th>
            </tr>
        </table>
        <div class="ml-4 mt-3">
            <button g-ref="destroyBlog" class="btn btn-secondary btn-sm text-white" type="button">
                {{ __('Supprimer') }}
            </button>
            <a href="{{ route('admin.blogs.create', ['article' => $blog->id]) }}"
                class="btn btn-secondary btn-sm text-white">
                {{ __('Editer') }}
            </a>
        </div>
    </x-card>
</div>
<script type="text/javascript" data-swup-reload-script>
    window.$blog_id = "{{ $blog->id }}";
</script>
@endsection