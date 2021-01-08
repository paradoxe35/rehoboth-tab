<script type="module" src="{{ env('DEV_SERVER') }}/@vite/client"></script>
@foreach (explode(',', env($entries)) as $entry)
    @if ($entry)
        <script type="module" src="{{ env('DEV_SERVER') }}/{{ $entry }}"></script>
    @endif
@endforeach