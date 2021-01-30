<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        @foreach ($items ?? [] as $item)
        <li class="breadcrumb-item h5 {{ $item['active'] ? 'active': '' }}" {{ $item['active'] ? 'aria-current="page"' : '' }}>
            @if (!$item['active'])
                <a href="{{ $item['link'] }}">{{ __($item['name']) }}</a>
            @else
                {{ __($item['name']) }}
            @endif
        </li>
        @endforeach
    </ol>
</nav>
@if (!isset($hr))
<hr>
@endif