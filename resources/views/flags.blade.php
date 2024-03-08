@extends('app')


@section('content')

<main class="flags-main">
    <form action="/flags" method="post" id="nav-submit" class="search-wrap">
        @csrf
        <x-auto-complete-input name="flag" placeholder="{{ __('messages.inputPassPoint') }}" />
        <div id="error-display"></div>
        <button class="search-btn" id="add-flag">{{ __('messages.add') }}</button>


        {{-- TODO: nameのみにしてjs側からid参照をなくす --}}
        <input type="hidden" id="pac-lat" name="pac-lat" value="{{ session('start.lat') }}">
        <input type="hidden" id="pac-lng" name="pac-lng" value="{{ session('start.lng') }}">
    </form>
    <div class="flags-wrap">
        <div class="flag">
            <div class="flag__header">
                <h3 class="flag__checkpoint">{{ __('messages.departure') }}</h3>
            </div>
            <p class="flag__name" id="startlocation"></p>
        </div>
    </div>

    <!-- fix:BEM -->
    <div class="recommend">
        <h2 class="recommend__header">おすすめのお店</h2>
        <div id="restaurant-info" style="margin-top: 30px"></div>
    </div>
</main>

@endsection

@section('script')
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('js/auto-complete.js') }}"></script>
    <script src="{{ asset('js/add-flag.js') }}"></script>
    <script src="{{ asset('js/search-shop.js') }}"></script>
    <script src="{{ asset('js/MapbuttonAction.js') }}"></script>
    <script src="{{ asset('js/Startgetlocation.js') }}"></script>
@endsection
