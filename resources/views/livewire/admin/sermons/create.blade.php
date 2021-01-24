<x-card g-component="SermonCreate">
    <x-livewire-js-instance />

    <form autocomplete="off" class="needs-validation" novalidate wire:submit.prevent="store"
        enctype="multipart/form-data">

        <div>
            <x-flash-message session="failed" type="danger" :top="true" />

            <x-flash-message session="created" type="success" :top="true" :reload="true" />
        </div>

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
                    <div wire:ignore>
                        <x-input-file type="file" :optional="true" model="image" label="Image couverture"
                            g-ref="imageInput" />
                    </div>

                    @error('image')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="col-lg-6">

                <div class="mb-4">
                    <x-input type="text" model="video" optionalText="Lien Youtube" :optional="true" label="Video" />
                </div>

                <div class="mb-4">
                    <div wire:ignore>
                        <x-input-file type="file" model="audios" g-ref="audioInput" label="Audio" multiple />
                    </div>

                    @error('audios.*')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

                <div class="mb-4">
                    <div wire:ignore>
                        <x-input-file type="file" model="documents" g-ref="documentInput" label="Document" multiple />
                    </div>

                    @error('documents.*')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror
                </div>

            </div>
        </div>
        <x-button type="submit" class="text-white mt-3">
            {{ __("Enregister") }}
        </x-button>
    </form>
</x-card>