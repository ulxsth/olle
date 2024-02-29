<html>
  <body>
    <p>旅館: {{ session('ryokan') }}</p>
    <p>温泉: {{ session('onsen') }}</p>
    <p>日付: {{ session('date') }}</p>
    <a href="{{ route('ryokan') }}">modoru</a>
  </body>
</html>
