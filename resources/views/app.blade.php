<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">

    @if (app()->environment() === "local")

    <script type="module" src="{{ env('DEV_SERVER') }}/vite/client"></script>
    @foreach (explode(',', env('DEV_SERVER_ENTRIES')) as $entry)
    @if ($entry)
    <script type="module" src="{{ env('DEV_SERVER') }}/{{ $entry }}" defer></script>
    @endif
    @endforeach

    @else
    <link href="{{ mix('main-style.css', 'assets') }}" rel="stylesheet">
    <script src="{{ mix('main-style.js', 'assets') }}" defer></script>
    <script src="{{ mix('manifest.js', 'assets') }}" defer></script>
    <script src="{{ mix('vendor.js', 'assets') }}" defer></script>
    <script type="module" src="{{ mix('main.js', 'assets') }}" defer></script>
    @endif

    @routes
</head>

<body>
    @inertia
</body>

</html>