<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $app_name }}</title>
    @livewireStyles
    <link rel="stylesheet" href="https://deo8mru8cr8lj.cloudfront.net/be670015-0e71-4dca-8785-c28ecea8d203/css/app.css">
    <style type="text/css">
        html,
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100%;
            overflow: hidden;
        }

        .button {
            padding: 0.25rem 0.5rem;
            font-size: 0.675rem;
            color: #fff;
            border-radius: 0.2rem;
            background-color: #bcac76;
            border-color: #bcac76;
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            border: 1px solid transparent;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
    </style>
    <script defer src="https://deo8mru8cr8lj.cloudfront.net/be670015-0e71-4dca-8785-c28ecea8d203/js/app.js">
    </script>
</head>

<body>
    @livewire($component, $attribute)


    @if (app()->environment() === "local")

        @include('vite-assets', ['entries' => 'DEV_SERVER_FRAME_ENTRIES'])

    @else
        <script src="{{ mix('manifest.js', 'assets') }}"></script>
        <script src="{{ mix('livewire-frame.js', 'assets') }}"></script>
    @endif
    
    @livewireScripts
</body>

</html>