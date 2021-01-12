<x-card g-component="SermonEdit">
    <x-livewire-js-instance />

    <h5>{{ __("Editer Media") }}</h5>

    <x-nav-tab :tabs='["Image couverture", "Video", "Audios", "Documents"]'>

        <x-slot name="image_couverture">

            <div class="row">
                <div class="col-lg-5 mb-3">
                    @if ($image)
                    <div class="my-2">
                        <x-button wire:click="deleteImage({{ $image->id }})" target="deleteImage" class="text-xs p-1"
                            color="danger">
                            {{ __("Supprimer") }}
                        </x-button>
                    </div>
                    <div class="w-100 d-flex justify-content-center">
                        <img src="{{ $image->public_path }}" class="img-fluid img-thumbnail">
                    </div>
                    @else
                    <x-alert message="Aucune image enregistrée" />
                    @endif
                </div>
                <div class="col-lg-7 mb-3">
                    <div wire:ignore>
                        <x-input-file type="file" model="imageModel" label="Image couverture" g-ref="imageInput" />
                    </div>

                    @error('imageModel')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror

                    <x-button wire:click="saveImage()" target="saveImage,imageModel"
                        class="text-xs p-1 text-white mt-3">
                        {{ __("Enregistrer") }}
                    </x-button>
                </div>
            </div>

        </x-slot>


        <x-slot name="video">
            <div class="row">
                <div class="col-lg-6">
                    @if ($video)
                    <div class="my-2">
                        <x-button wire:click="deleteFile({{ $video->id }}, 'video')" target="deleteFile" class="text-xs p-1"
                            color="danger">
                            {{ __("Supprimer") }}
                        </x-button>
                    </div>
                    <div id="preview-{{ md5($video->path) }}" wire:ignore></div>
                    <script id="{{ md5($video->path) }}">
                        var previewyt = document.getElementById("preview-{{ md5($video->path) }}");
                        if (window.ytLinkToEmbedCode) {
                            previewyt.innerHTML = window.ytLinkToEmbedCode("{{ $video->path }}");
                        } else {
                            window.onload = () => {
                                if (window.ytLinkToEmbedCode) {
                                    previewyt.innerHTML = window.ytLinkToEmbedCode("{{ $video->path }}");
                                }
                            }
                        }
                    </script>
                    @else
                    <x-alert message="Aucune video enregistrée" />
                    @endif

                </div>
                <div class="col-lg-6 mt-4">
                    <x-input type="text" model="videoModel" optionalText="Lien Youtube" :optional="true"
                        label="Video" />

                    <x-button wire:click="saveVideo()" target="saveVideo,imageModel"
                        class="text-xs p-1 text-white mt-3">
                        {{ __("Enregistrer") }}
                    </x-button>
                </div>
            </div>
        </x-slot>

        <x-slot name="audios">
            <div class="row">
                <div class="col-lg-6">
                    @forelse ($audios as $audio)
                    <div class="d-flex justify-content-between">
                        <div>
                            <div class="mb-1 ml-1">
                                <b><small>{{ $audio->name }}</small></b>
                            </div>
                            <audio preload="none" controls="" playsinline="" controlslist="nodownload">
                                <source src="{{ $audio->public_path }}" type="audio/mpeg">
                            </audio>
                        </div>
                        <span>
                            <x-button wire:click="deleteFile({{ $audio->id }}, 'audio')" target="deleteFile"
                                class="text-xs p-1" color="danger">
                                {{ __("Supprimer") }}
                            </x-button>
                        </span>
                    </div>
                    <hr>
                    @empty
                    <x-alert message="Aucun audio enregistré" />
                    @endforelse
                </div>
                <div class="col-lg-6">

                    <div wire:ignore>
                        <x-input-file type="file" model="audiosModel" g-ref="audioInput" label="Audios" multiple />
                    </div>

                    @error('audiosModel.*')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror

                    <x-button wire:click="saveAudios()" target="saveAudios,audiosModel"
                        class="text-xs p-1 text-white mt-3">
                        {{ __("Enregistrer") }}
                    </x-button>
                </div>
            </div>
        </x-slot>

        <x-slot name="documents">
            <div class="row">
                <div class="col-lg-6">
                    @forelse ($documents as $doc)

                    <div class="d-flex justify-content-between">
                        <span>
                            <svg width="32" height="32" viewBox="0 0 32 32">
                                <path
                                    d="M26.7062 9.02188C26.8937 9.20938 27 9.4625 27 9.72812V29C27 29.5531 26.5531 30 26 30H6C5.44687 30 5 29.5531 5 29V3C5 2.44687 5.44687 2 6 2H19.2719C19.5375 2 19.7938 2.10625 19.9813 2.29375L26.7062 9.02188V9.02188ZM24.6938 10.1875L18.8125 4.30625V10.1875H24.6938ZM19.7881 19.9144C19.3137 19.8988 18.8094 19.9353 18.2366 20.0069C17.4772 19.5384 16.9659 18.895 16.6028 17.9497L16.6362 17.8128L16.675 17.6509C16.8094 17.0844 16.8816 16.6709 16.9031 16.2541C16.9194 15.9394 16.9019 15.6491 16.8459 15.38C16.7428 14.7991 16.3319 14.4594 15.8141 14.4384C15.3312 14.4187 14.8875 14.6884 14.7741 15.1062C14.5894 15.7819 14.6975 16.6709 15.0891 18.1872C14.5903 19.3762 13.9312 20.7703 13.4891 21.5478C12.8987 21.8522 12.4391 22.1291 12.0528 22.4359C11.5434 22.8413 11.2253 23.2578 11.1378 23.6953C11.0953 23.8981 11.1594 24.1631 11.3053 24.3803C11.4709 24.6266 11.7203 24.7866 12.0194 24.8097C12.7741 24.8681 13.7016 24.09 14.7256 22.3328C14.8284 22.2984 14.9372 22.2622 15.07 22.2172L15.4419 22.0916C15.6772 22.0122 15.8478 21.9553 16.0166 21.9006C16.7478 21.6625 17.3009 21.5122 17.8041 21.4266C18.6784 21.8947 19.6891 22.2016 20.3697 22.2016C20.9316 22.2016 21.3112 21.9103 21.4484 21.4519C21.5687 21.0494 21.4734 20.5825 21.2147 20.3244C20.9472 20.0616 20.4553 19.9359 19.7881 19.9144V19.9144ZM12.0384 23.9275V23.9163L12.0425 23.9056C12.0882 23.7874 12.1469 23.6746 12.2175 23.5694C12.3512 23.3637 12.5353 23.1475 12.7634 22.9172C12.8859 22.7937 13.0134 22.6734 13.1631 22.5384C13.1966 22.5084 13.4103 22.3181 13.4503 22.2806L13.7994 21.9556L13.5456 22.3597C13.1606 22.9734 12.8125 23.4153 12.5144 23.7034C12.4047 23.8097 12.3081 23.8878 12.23 23.9381C12.2042 23.9554 12.1769 23.9702 12.1484 23.9825C12.1356 23.9878 12.1244 23.9909 12.1131 23.9919C12.1012 23.9934 12.0892 23.9918 12.0781 23.9872C12.0664 23.9823 12.0563 23.974 12.0493 23.9633C12.0422 23.9527 12.0384 23.9403 12.0384 23.9275V23.9275ZM15.9741 17.1063L15.9034 17.2313L15.8597 17.0944C15.7628 16.7872 15.6916 16.3244 15.6719 15.9069C15.6494 15.4319 15.6872 15.1469 15.8372 15.1469C16.0478 15.1469 16.1444 15.4844 16.1519 15.9922C16.1587 16.4384 16.0884 16.9028 15.9738 17.1063H15.9741ZM15.7925 18.9331L15.8403 18.8066L15.9056 18.9253C16.2709 19.5891 16.745 20.1428 17.2663 20.5287L17.3787 20.6119L17.2416 20.64C16.7312 20.7456 16.2559 20.9044 15.6059 21.1666C15.6738 21.1391 14.9303 21.4434 14.7422 21.5156L14.5781 21.5784L14.6656 21.4259C15.0516 20.7541 15.4081 19.9472 15.7922 18.9331H15.7925ZM20.7181 21.3162C20.4725 21.4131 19.9437 21.3266 19.0128 20.9291L18.7766 20.8284L19.0328 20.8097C19.7609 20.7556 20.2766 20.7956 20.5772 20.9056C20.7053 20.9525 20.7906 21.0116 20.8284 21.0791C20.8483 21.111 20.855 21.1495 20.8471 21.1863C20.8392 21.2231 20.8172 21.2553 20.7859 21.2763C20.7661 21.2938 20.7431 21.3073 20.7181 21.3162V21.3162Z"
                                    fill="#E94962"></path>
                            </svg>
                            <a target="_blank" class="text-sm text-decoration-underline" href="{{ $doc->public_path }}">
                                {{ $doc->name }}
                            </a>
                        </span>

                        <span>
                            <x-button wire:click="deleteFile({{ $doc->id }}, 'document')" target="deleteFile"
                                class="text-xs p-1" color="danger">
                                {{ __("Supprimer") }}
                            </x-button>
                        </span>
                    </div>
                    <hr>
                    @empty
                    <x-alert message="Aucun document enregistré" />
                    @endforelse
                </div>

                <div class="col-lg-6">
                    <div wire:ignore>
                        <x-input-file type="file" model="documentsModel" g-ref="documentInput" label="Documents"
                            multiple />
                    </div>

                    @error('documentsModel.*')
                    <div class="text-danger">{{ $message }}</div>
                    @enderror

                    <x-button wire:click="saveDocuments()" target="saveDocuments,documentsModel"
                        class="text-xs p-1 text-white mt-3">
                        {{ __("Enregistrer") }}
                    </x-button>
                </div>
            </div>
        </x-slot>

    </x-nav-tab>

</x-card>