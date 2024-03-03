@extends('app')

@section('content')
    <form action="/ryokan" method="post">
        @csrf
        <x-auto-complete-input name="ryokan" placeholder="旅館名を入力" />
        <button type="submit">next</button>

        {{-- TODO: nameのみにしてjs側からid参照をなくす --}}
        <input type="hidden" name="pac-lat" id="pac-lat">
        <input type="hidden" name="pac-lng" id="pac-lng">
    </form>
@endsection

@section('script')
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('js/auto-complete.js') }}"></script>
@endsection
