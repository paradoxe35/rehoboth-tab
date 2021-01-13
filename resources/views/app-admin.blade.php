<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title'){{ $app_name }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    @yield('head-meta')
    @yield('head-secondary')

    <style>
        body {
            background-color: rgba(210, 214, 220, 0.384) !important;
        }
    </style>

    @livewireStyles
    
    @if (app()->environment() === "local")
        @include('vite-assets', ['entries' => 'DEV_SERVER_ADMIN_ENTRIES'])
    @else
        <link href="{{ mix('main-style.css', 'assets') }}" rel="stylesheet">
        <script src="{{ mix('main-style.js', 'assets') }}"></script>
        <script src="{{ mix('manifest.js', 'assets') }}" defer></script>
        <script type="module" src="{{ mix('admin.js', 'assets') }}" defer></script>
    @endif

    {{-- ziggy:tags --}}
    @routes
</head>

<body @yield('body-attr') class="@yield('body-class')">
    <div id="swup" class="mb-5">
        @yield('body')

        {{ $slot ?? '' }}
    </div>

    @livewireScripts
</body>

</html>