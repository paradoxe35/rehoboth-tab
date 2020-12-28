<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $app_name }}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    @yield('head-meta')
    @yield('head-secondary')

    @if (app()->environment() === "local")

    <script type="module" src="{{ env('DEV_SERVER') }}/vite/client"></script>
    @foreach (explode(',', env('DEV_SERVER_ADMIN_ENTRIES')) as $entry)
    @if ($entry)
    <script type="module" src="{{ env('DEV_SERVER') }}/{{ $entry }}" defer></script>
    @endif
    @endforeach

    @else
    <script src="{{ mix('manifest.js', 'assets') }}" defer></script>
    <script type="module" src="{{ mix('admin.js', 'assets') }}" defer></script>
    @endif


</head>

<body @yield('body-attr') class="@yield('body-class')">
    @yield('body')
</body>

</html>