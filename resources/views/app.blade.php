<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    {{--  section:seometa --}}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta property="og:language" content="{{ app()->getLocale() }}">

    {{-- @section('seometa')
    <meta property="og:type" content="website">
    <meta property="og:title" content="@yield('title'){{ $app_name }}">
    <meta property="og:description" content="{{ $app_description }}">
    <meta property="og:image" content="{{ asset('img/siku/siku.png') }}">
    <meta name="twitter:image" content="{{ asset('img/siku/siku.png') }}">
    @show --}}

    <meta name="twitter:creator" content="{{ config('app.name') }}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="{{ '@'.config('app.name') }}">

    {{-- section:assets --}}
    @if (app()->environment() === "local")

        @include('vite-assets', ['entries' => 'DEV_SERVER_ENTRIES'])

    @else
        <link href="{{ mix('main-style.css', 'assets') }}" rel="stylesheet">
        <script src="{{ mix('main-style.js', 'assets') }}"></script>

        <script src="{{ mix('manifest.js', 'assets') }}" defer></script>
        <script src="{{ mix('vendor.js', 'assets') }}" defer></script>
        <script type="module" src="{{ mix('main.js', 'assets') }}" defer></script>
    @endif

    {{-- ziggy:tags --}}
    @routes('guest')
</head>

<body>
    @inertia
    @include('entry-load')
</body>

</html>