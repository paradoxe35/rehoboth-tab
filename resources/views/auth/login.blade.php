@extends('app-admin')

@section('body')
<div class="container">
    <div class="row justify-content-center align-items-center text-center" style="height: 90vh">
        <div class="col-md-5 col-lg-3">
            <h1 class="h2 mb-3">{{ $app_name }}</h1>
            <h5 class="mb-3 fw-normal">{{ __('Veuillez vous connecter') }}</h5>

            <form method="POST" action="{{ route('admin.login') }}" autocomplete="off">
                @csrf
                <div>
                    <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                        name="email" value="{{ old('email') }}" placeholder="{{ __('E-Mail Adresse') }}" autofocus>
                    @error('email')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div>
                    <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                        name="password" placeholder="{{ __('Mot de passe') }}">

                    @error('password')
                    <span class="invalid-feedback" role="alert">
                        <strong>{{ $message }}</strong>
                    </span>
                    @enderror
                </div>

                <div class="my-3">
                    <div class="checkbox">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember"
                            {{ old('remember') ? 'checked' : '' }}>
                        <label class="form-check-label" for="remember">
                            {{ __('Se souvenir') }}
                        </label>
                    </div>
                </div>

                <div>
                    <button type="submit" class="btn btn-primary text-white">
                        {{ __('Connexion') }}
                    </button>
                    @if (Route::has('password.request'))
                    <a class="btn btn-link" href="{{ route('password.request') }}">
                        {{ __('Mot de pass oublié ?') }}
                    </a>
                    @endif
                </div>

                <p class="mt-5 mb-3 text-muted">&copy;{{ now()->format('Y') }}</p>
            </form>
        </div>
    </div>
</div>
@endsection