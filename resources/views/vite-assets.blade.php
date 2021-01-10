<script type="module" src="{{ env('DEV_SERVER') }}/vite/client" defer></script>
@foreach (explode(',', env($entries)) as $entry)
    @if ($entry)
        <script type="module" src="{{ env('DEV_SERVER') }}/{{ $entry }}" defer></script>
    @endif
@endforeach