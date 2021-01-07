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
    </style>
    <script defer src="https://deo8mru8cr8lj.cloudfront.net/be670015-0e71-4dca-8785-c28ecea8d203/js/app.js">
    </script>
</head>

<body>
    @livewire($component, $attribute)

    <script src="{{ mix('manifest.js', 'assets') }}"></script>
    <script src="{{ mix('livewire-frame.js', 'assets') }}"></script>
    @livewireScripts
</body>

</html>