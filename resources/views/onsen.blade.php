@extends("app")

@section("content")
<p>{{ session('ryokan') }}</p>
<form action="/onsen" method="post">
  @csrf
  <x-auto-complete-input name="onsen" type="onsen" placeholder="温泉名を入力" />

  <button type="submit">next</button>
</form>
@endsection
