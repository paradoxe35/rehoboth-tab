<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    
    {!! Meta::toHtml() !!}

    @include('favicon')
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="site-name" content="{{ $app_name }}" />
    <meta name="lang" content="{{ app()->getLocale() }}" />

    <meta property="og:site_name" content="{{ $app_name }}">
    <meta property="og:language" content="{{ app()->getLocale() }}">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="{{ "@".$app_name }}">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

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