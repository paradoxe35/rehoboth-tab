@extends('admin.pages.layout-page')


@section('page-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Sermons',
        'active' => false,
        'link' => route('admin.sermons.index')
    ],
    [
        'name' => "Editer sermon - {$sermon->subject}",
        'active' => true
    ]
]])

<div g-component="SermonEdit">
    <x-spinner />
</div>
<script type="text/javascript" data-swup-reload-script>
    window.$sermon = @json($sermon)
</script>
@endsection