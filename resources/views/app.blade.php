<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title></title>
</head>

<body>
    @yield('content')
    <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAUWAFJOooqQ8qrcHK-5C-a_AlJKt2zjcc&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('/js/google-map-api.js') }}"></script>
</body>

</html>
