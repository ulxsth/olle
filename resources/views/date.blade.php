@extends('app')

@section('content')
{{--フォーム送信を行うためにid追加--}}
<form action="/date" method="post" id="nav-submit">
    @csrf
    {{-- エラーメッセージ表示部分 --}}
    <div id="error-display"></div>
    <label for="date">日付</label>
    <input type="date" name="date" id="date">
</form>
@endsection

@section('script')
<script src="https://maps.googleapis.com/maps/api/js?key={{ env('GOOGLE_MAP_API_KEY') }}&callback=initMap&libraries=places&v=weekly&solution_channel=GMP_CCS_autocomplete_v1" defer></script>
    <script src="{{ asset('js/auto-complete.js') }}"></script>
    <script src="{{ asset('js/DatebuttonAction.js') }}"></script>
@endsection

