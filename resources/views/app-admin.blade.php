<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title'){{ $app_name }} Admin</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    @include('favicon')

    @yield('head-meta')
    @yield('head-secondary')

    <style>
        body {
            background-color: rgba(210, 214, 220, 0.384) !important;
        }
    </style>

    @livewireStyles

    @include('assets.assets', [
        'entries' => 'DEV_SERVER_ADMIN_ENTRIES',
        'assets' => [
            ['tag' => 'link', 'src' => 'style.css'],
            ['tag' => 'script', 'src' => 'manifest.js'],
            ['tag' => 'script', 'src' => 'admin.js'],
        ]
    ])

    {{-- ziggy:tags --}}
    @routes('admin')
</head>

<body @yield('body-attr') class="@yield('body-class')">
    <div id="swup" class="mb-5">
        <div id="app-payload" @yield('app-attr')>
            @yield('body')

            {{ $slot ?? '' }}

            @yield('bottom-body')
        </div>
    </div>

    @livewireScripts
</body>

</html>