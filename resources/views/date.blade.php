@extends("app")

@section("content")
<main class="main">
    <form action="/date" method="post">
        @csrf
        <label for="date">日付</label>
        <input type="date" name="date" id="date">
        <button type="submit">next</button>
    </form>
</main>
@endsection
