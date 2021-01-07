<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" g-component="Sidebar">
    <div class="position-sticky pt-3">
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link {{ Str::contains(request()->fullUrl(), route('admin.home')) ? 'active' : '' }}"
                    href="{{ route('admin.home') }}">
                    <span data-feather="home"></span>
                    {{ __("Profil") }}
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ Str::contains(request()->fullUrl(), route('admin.sermons.index')) ? 'active' : '' }}"
                    href="{{ route('admin.sermons.index') }}">
                    <span data-feather="file"></span>
                    {{ __("Sermons") }}
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ Str::contains(request()->fullUrl(), route('admin.events.index')) ? 'active' : '' }}"
                    href="{{ route('admin.events.index') }}">
                    <span data-feather="file"></span>
                    {{ __("Événements") }}
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ Str::contains(request()->fullUrl(), route('admin.galleries.index')) ? 'active' : '' }}"
                    href="{{ route('admin.galleries.index') }}">
                    <span data-feather="shopping-cart"></span>
                    {{ __("Galerie") }}
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ Str::contains(request()->fullUrl(), route('admin.blogs.index')) ? 'active' : '' }}"
                    href="{{ route('admin.blogs.index') }}">
                    <span data-feather="bar-chart-2"></span>
                    {{ __("Blog") }}
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link {{ Str::contains(request()->fullUrl(), route('admin.messages.index')) ? 'active' : '' }}"
                    href="{{ route('admin.messages.index') }}">
                    <span data-feather="layers"></span>
                    {{ __("Messages") }}
                </a>
            </li>
        </ul>
    </div>
</nav>