<div class="row">
    <div class="col-lg-6">
        <x-card className="h-100">
            <div class="table-responsive">
                <table class="table table-borderless text-muted">
                    <thead>
                        <tr>
                            <th scope="col">E-mail</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ Auth::user()->email }}</td>
                            <td>{{ Auth::user()->name }}</td>
                            <td>{{ Auth::user()->phone }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="table-responsive">
                <table class="table table-borderless text-muted">
                    <thead>
                        <tr>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                @if (Auth::user()->superAdmin())
                                <span class="badge bg-primary">Super Admin</span>
                                @else
                                <span class="badge bg-secondary">Admin</span>
                                @endif
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </x-card>
    </div>
    @if (Auth::user()->email != config('app.admin'))
    <div class="col-lg-6">
        <x-card className="h-100">
            <div>
                <x-flash-message session="failed" type="danger" />

                <x-flash-message session="edited" type="success" />
            </div>

            <form novalidate wire:submit.prevent="updateUser" method="POST" autocomplete="off">
                @csrf
                <div class="row">
                    <div class="mb-3 col-lg-6">
                        <x-input type="email" model="email" label="Email" />
                    </div>

                    <div class="mb-3 col-lg-6">
                        <x-input type="tel" model="phone" label="Phone" />
                    </div>
                </div>

                <div class="mb-3">
                    <x-input type="text" model="name" label="Nom" />
                </div>

                <x-button type="submit" target="updateUser" class="text-xs p-1 text-white mt-3">
                    {{ __("Mettre à jour") }}
                </x-button>
            </form>
        </x-card>
    </div>
    @endif

    <div class="col-lg-6 @if (Auth::user()->email != config('app.admin')) mt-2 @endif">
        <x-card>
            <h5 class="text-muted text-xs">{{ __("Changer mot de passe") }}</h5>
            <div>
                <x-flash-message session="editedPwd" type="success" />
            </div>
            <form novalidate wire:submit.prevent="updateUserPassword" method="POST" autocomplete="off">
                <div class="mb-3">
                    <x-input type="password" model="password" label="Mot de passe actuel" />
                </div>

                <div class="row">
                    <div class="mb-3 col-lg-6">
                        <x-input type="password" model="new_password" label="Nouveau Mot de Passe" />
                    </div>
                    <div class="mb-3 col-lg-6">
                        <x-input type="password" model="new_password_confirmation" label="Confirmer Mot de passe" />
                    </div>
                </div>

                <x-button type="submit" target="updateUserPassword" class="text-xs p-1 text-white mt-3">
                    {{ __("Mettre à jour") }}
                </x-button>
            </form>
        </x-card>
    </div>
</div>