<html>
  <body>
    <p>{{ session('ryokan') }}</p>
    <form action="/onsen" method="post">
      @csrf
      <x-auto-complete-input type="onsen" />

      <button type="submit">next</button>
    </form>
  </body>
</html>
