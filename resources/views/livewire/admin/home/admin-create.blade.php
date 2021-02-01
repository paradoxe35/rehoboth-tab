<div>
    <x-livewire-js-instance />
    <x-nav-tab :tabs='["Administrateurs", "Nouveau Administrateur"]'>

        <x-slot name="administrateurs">
            <x-card>
                <div class="table-responsive">
                    <table class="table text-muted">
                        <thead>
                            <tr>
                                <th scope="col">{{ __("Email") }}</th>
                                <th scope="col">{{ __("Nom") }}</th>
                                <th scope="col">{{ __("Phone") }}</th>
                                <th scope="col">{{ __("Super Admin") }}</th>
                                <th scope="col">{{ __("Supprimer") }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users as $user)
                            <tr>
                                <td>{{ $user->email }}</td>
                                <td>{{ $user->name }}</td>
                                <td>{{ $user->phone }}</td>
                                <td>{{ $user->superAdmin() ? 'Oui' : 'Non' }}</td>
                                <td>
                                    @if (Auth::user()->id != $user->id && $user->email != config('app.admin'))
                                    <x-button
                                        onclick="if(confirm('Etes vous sur')){livewireInstance().delete({{ $user->id }})}"
                                        target="delete" class="text-xs p-1" color="danger">
                                        {{ __("Supprimer") }}
                                    </x-button>
                                    @else
                                    <span>--</span>
                                    @endif
                                </td>
                            </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </x-card>
        </x-slot>

        <x-slot name="nouveau_administrateur">
            <x-card>
                <div>
                    <x-flash-message session="failed" type="danger" />

                    <x-flash-message session="created" type="success" />
                </div>

                <form novalidate wire:submit.prevent="store" method="POST" autocomplete="off">
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

                    <div class="row">
                        <div class="mb-3 col-lg-6">
                            <x-input type="password" model="password" label="Mot de Passe" />
                        </div>

                        <div class="mb-3 col-lg-6">
                            <x-input type="password" model="password_confirmation" label="Confirmer Mot de passe" />
                        </div>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" wire:model="super_admin" type="checkbox" value=""
                            id="flexCheckDefault" />
                        <label class="form-check-label" for="flexCheckDefault">
                            {{ __('Super Administrateur') }}
                        </label>
                    </div>

                    <x-button type="submit" target="store" class="text-xs p-1 text-white mt-3">
                        {{ __("Enregistrer") }}
                    </x-button>
                </form>
            </x-card>
        </x-slot>
    </x-nav-tab>
</div>