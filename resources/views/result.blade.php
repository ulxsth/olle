@extends('app')

@section('content')
    <div class="container">
        <p>所要時間：<span id="duration"></span></p>
        <input checked type="radio" name="travel-mode" value="WALKING">🏃
        <input type="radio" name="travel-mode" value="BICYCLING">🚲
        <input type="radio" name="travel-mode" value="DRIVING">🚗
        <input type="radio" name="travel-mode" value="TRANSIT">🚌
        <div id="map" style="width: 100%; height: 100vh"></div>
        <input type="hidden" id="start-lat" value="{{ session('start.lat') }}">
        <input type="hidden" id="start-lng" value="{{ session('start.lng') }}">
        <input type="hidden" id="flag-lat" value="{{ session('flag.lat') }}">
        <input type="hidden" id="flag-lng" value="{{ session('flag.lng') }}">
    </div>
@endsection

@section('script')
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('js/result-map.js') }}"></script>
@endsection
