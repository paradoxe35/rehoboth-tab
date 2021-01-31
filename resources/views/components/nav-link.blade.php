<ul class="nav nav-pills my-4">
    @foreach ($links as $key => $link)
    <li class="nav-item" role="presentation">
        <a href="{{ route($link['route']) }}"
            class="nav-link {{ $key != 0 ? 'mx-2' : '' }} border-darken border {{ Str::contains(request()->fullUrl(), route($link['route'])) ? 'active' : '' }}"
            aria-controls="{{ $link['route'] }}"
            aria-selected="{{ Str::contains(request()->fullUrl(), route($link['route'])) ? 'true' : 'false' }}">{{ __($link['name']) }}</a>
    </li>
    @endforeach
</ul>
