<div class="row justify-content-center">
    <div class="col-lg-6">
        <div class="card mb-3 shadow-sm border-light h-100">
            <div class="card-header">
                <strong>{{ __("Administrateurs") }}</strong>
            </div>
            <div class="card-body">
                <table class="table text-muted">
                    <thead>
                        <tr>
                            <th scope="col">{{ __("Email") }}</th>
                            <th scope="col">{{ __("Nom") }}</th>
                            <th scope="col">{{ __("Modifier") }}</th>
                            <th scope="col">{{ __("Supprimer") }}</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card mb-3 shadow-sm border-light h-100">
            <div class="card-header">
                <strong>{{ __("Nouveau Administrateur") }}</strong>
            </div>
            <div class="card-body">
                @if (session('saved'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    {{ session('saved') }}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                @endif
                <form action="" method="POST" autocomplete="off">
                    @csrf
                    <div class="form-row">
                        <div class="col-12 mb-3">
                            <label for="email">{{ __("Email") }}</label>
                            <input type="email" name="email" class="form-control @error('email') is-invalid @enderror"
                                id="email" required>
                            @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                        <div class="col-12 mb-3">
                            <label for="name">{{ __("Nom") }}</label>
                            <input type="text" name="name" class="form-control @error('name') is-invalid @enderror"
                                id="name" required>
                            @error('name')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                        <div class="col-12 mb-3">
                            <label for="password">{{ __("Mot de Passe") }}</label>
                            <input type="password" name="password"
                                class="form-control @error('password') is-invalid @enderror" id="password" required>
                            @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                            @enderror
                        </div>
                    </div>
                    <button class="btn btn-primary" type="submit">{{ __("Enregistrer") }}</button>
                </form>
            </div>
        </div>
    </div>
</div>