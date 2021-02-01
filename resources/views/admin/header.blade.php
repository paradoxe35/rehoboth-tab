<header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{{ $app_name }}</a>
    <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100 bg-transparent" type="text" disabled
        placeholder="{{ Auth::user()->name }}" aria-label="Search">
    <livewire:loader />
    <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
            <a class="nav-link" data-no-swup href="{{ route('admin.logout') }}" onclick="event.preventDefault();
                                                 document.getElementById('logout-form').submit();">
                {{ __('Déconnexion') }}
            </a>
            <form id="logout-form" action="{{ route('admin.logout') }}" method="POST" style="display: none;">
                @csrf
            </form>
        </li>
    </ul>
</header>