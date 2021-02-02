<div class="modal fade" id="new--profile-modal" tabindex="-1" role="dialog" aria-labelledby="custom-payment-modalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Nouveau Profil') }}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form g-ref="profileForm" method="post" autocomplete="off">
                    @csrf
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <x-input type="text" model="name" label="Nom" />
                            </div>
                            <div class="mb-3">
                                <x-input type="email" :optional="true" model="email" label="Email" />
                            </div>

                            <div class="mb-3">
                                <x-input type="tel" model="phone" label="Phone" />
                            </div>

                            <div class="mb-3">
                                <x-textarea type="text" :optional="true" model="description" label="Description" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-3">
                                <label class="mb-2">{{ __('Image') }}</label>
                                <div g-ref="profileImage"></div>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex justify-content-end">
                        <x-button type="submit" class="text-white mt-3">
                            {{ __("Enregister") }}
                        </x-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>