<div>
    @if (session()->has($session))
    <div class="alert alert-{{ $type }} alert-dismissible fade show" role="alert">
        {{ session($session) }}
        <button type="button" class="btn-close btn-sm" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
        @if ($top)
            <x-scroll-top />
        @endif
        @if ($reload)
            <x-full-reload />
        @endif
    @endif
</div>