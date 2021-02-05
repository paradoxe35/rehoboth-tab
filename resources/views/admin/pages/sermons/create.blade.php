@extends('admin.pages.layout-page')


@section('page-content')

@include('admin.breadcrumb', ['items' => [
    [
        'name' => 'Sermons',
        'active' => false,
        'link' => route('admin.sermons.index')
    ],
    [
        'name' => 'Ajouter sermon',
        'active' => true
    ]
]])

<x-card g-component="SermonCreate">
    <form autocomplete="off" class="needs-validation" g-ref="store" enctype="multipart/form-data">
        <div class="row">
            <div class="col-lg-6">

                <div class="mb-3">
                    <x-input type="text" model="subject" label="Sujet" />
                </div>

                <div class="mb-3">
                    <x-input type="text" model="preacher" label="Prédicateur" />
                </div>

                <div class="mb-3">
                    <x-input type="date" model="date" label="Date" />
                </div>

                <div class="mb-3">
                    <x-textarea type="text" :optional="true" model="description" label="Description" />
                </div>

                <div class="mb-3">
                    <x-input-file type="file" :optional="true" model="image" label="Image couverture"
                        g-ref="imageInput" />
                </div>
            </div>

            <div class="col-lg-6">

                <div class="mb-4">
                    <x-input type="text" model="video" optionalText="Lien Youtube" :optional="true" label="Video" />
                </div>

                <div class="mb-4">
                    <x-input-file type="file" model="audios" g-ref="audioInput" label="Audio" multiple />
                </div>

                <div class="mb-4">
                    <x-input-file type="file" model="documents" g-ref="documentInput" label="Document" multiple />
                </div>

            </div>
        </div>
        <x-button type="submit" class="text-white mt-3">
            {{ __("Enregister") }}
        </x-button>
    </form>
</x-card>

@endsection