<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    @if (app()->environment() === "local")
    <script type="module" src="{{ env('DEV_SERVER') }}/vite/client"></script>
    <script type="module" src="{{ env('DEV_SERVER') }}/{{ env('DEV_SERVER_ENTRY') }}" defer></script>
    @else
    <link href="{{ mix('styles.css', 'assets') }}" rel="stylesheet">
    <script src="{{ mix('styles.js', 'assets') }}" defer></script>
    <script src="{{ mix('manifest.js', 'assets') }}" defer></script>
    <script src="{{ mix('vendor.js', 'assets') }}" defer></script>
    <script type="module" src="{{ mix('app.js', 'assets') }}" defer></script>
    @endif

    @routes
</head>

<body>
    @inertia
</body>

</html>