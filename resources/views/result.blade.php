@extends('app')

@section('content')
    <div class="container">
        <!-- ルート案内テキスト表示用の要素 -->
        <div id="route-instructions" style="display: none;"></div>
        <div class="hidden">
            <button id="toggle-list-button">ルート案内一覧を表示</button>
            <div id="route-list" style="display: none;">
                <h3>ルート案内一覧</h3>
                <ol id="route-steps"></ol>
            </div>
            <p>所要時間：<span id="duration"></span></p>
            <input checked type="radio" name="travel-mode" value="WALKING">🏃
            <input type="radio" name="travel-mode" value="BICYCLING">🚲
            <input type="radio" name="travel-mode" value="DRIVING">🚗
            <input type="radio" name="travel-mode" value="TRANSIT">🚌
        </div>
        <div id="map" class="map"></div>
        <input type="hidden" id="start-lat" value="{{ session('start.lat') }}">
        <input type="hidden" id="start-lng" value="{{ session('start.lng') }}">
        <input type="hidden" id="flag-lat" value="{{ session('flag.lat') }}">
        <input type="hidden" id="flag-lng" value="{{ session('flag.lng') }}">
        @include('components.map-menu')
    </div>
@endsection

@section('script')
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('js/result-map.js') }}"></script>
    <script src="{{ asset('js/map-menu.js') }}"></script>
@endsection
