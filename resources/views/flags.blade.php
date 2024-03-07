@extends('app')


@section('content')

<main class="flags-main">
    <form action="/flag" method="post" id="nav-submit" class="search-wrap">
        @csrf
        <x-auto-complete-input name="flag" placeholder="通過地点の建物名を入力..." />
        <div id="error-display"></div>
        <button class="search-btn" id="add-flag">追加</button>


        {{-- TODO: nameのみにしてjs側からid参照をなくす --}}
        <input type="hidden" id="pac-lat" name="pac-lat">
        <input type="hidden" id="pac-lng" name="pac-lng">
    </form>
    <div class="flags-wrap">
        <div class="flag">
            <div class="flag__header">
                <h3 class="flag__checkpoint">出発地点</h3>
            </div>
            <p class="flag__name">hogehoge温泉</p>
        </div>
    </div>
</main>

@endsection

@section('script')
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('js/auto-complete.js') }}"></script>
    <script src="{{ asset('js/MapbuttonAction.js') }}"></script>
    <script src="{{ asset('js/add-flag.js') }}"></script>
@endsection