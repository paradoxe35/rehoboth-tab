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
    <link rel="manifest" href="{{ asset('manifest.json') }}">

    {{-- section:assets --}}
     @include('assets.assets', [
        'entries' => 'DEV_SERVER_ENTRIES',
        'assets' => [
            ['tag' => 'link', 'src' => 'style.css'],
            ['tag' => 'script', 'src' => 'manifest.js'],
            ['tag' => 'script', 'src' => 'vendor.js'],
            ['tag' => 'script', 'src' => 'app.js'],
        ]
    ])
    {{-- ziggy:tags --}}
    @routes('guest')
</head>

<body>
    @inertia
    <noscript>Veuillez activer JavaScript pour continuer à utiliser cette application.</noscript>
    @include('entry-load')
</body>

</html>