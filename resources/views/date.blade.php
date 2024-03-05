@extends("app")

@section("content")
<main class="main">
    <form action="/date" method="post" id="nav-submit">
        @csrf
        <input type="date" name="date" id="date" class="search-input">
    </form>
</main>
@endsection
