@extends("app")

@section("content")
<main class="main">
    <form action="/date" method="post" id="nav-submit">
        @csrf
        <input type="date" name="date" id="date" class="search-input">
        <div id="error-display"></div>
    </form>
</main>
@endsection

@section('script')
    <script
        src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1"
        defer></script>
    <script src="{{ asset('js/auto-complete.js') }}"></script>
    <script src="{{ asset('js/DatebuttonAction.js') }}"></script>
@endsection