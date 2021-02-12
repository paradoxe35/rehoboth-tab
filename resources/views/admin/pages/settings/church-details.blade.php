@extends('admin.pages.settings')


@section('settings-breadcrumb')
@include('admin.breadcrumb', ['items' => [
     [
        'name' => 'Acceuil',
        'active' => false,
        'link' => route('admin.home')
    ],
    [
        'name' => 'Paramètres',
        'active' => true
    ],
    [
        'name' => "Détails de l'église",
        'active' => true
    ]
]])
@endsection

@section('settings-content')
<div g-component="ChurchDetailsPage">
    <x-spinner />
</div>

<script type="text/javascript" data-swup-reload-script>
    window.$details = @json($details);
</script>
@endsection