@if (env('DEV_MODE'))
    @foreach (explode(',', env($entries)) as $entry)
        @if ($entry)
        <script type="module" src="//{{ env('DEV_SERVER') }}/{{ $entry }}" ></script>
        @endif
    @endforeach

@else

    @foreach ($assets as $asset)
        @if ($asset['tag'] == 'link')
            <link href="{{ mix($asset['src'], 'assets') }}" rel="stylesheet"/>
        @endif

        @if ($asset['tag'] == 'script')
            <script src="{{ mix($asset['src'], 'assets') }}" defer></script>
        @endif
    @endforeach

@endif