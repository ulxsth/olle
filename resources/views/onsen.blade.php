<html>
  <body>
    <p>{{ session('ryokan') }}</p>
    <form action="/onsen" method="post">
      @csrf
      <label for="onsen">温泉</label>
      <select name="onsen" id="onsen">
        <option value="温泉1">温泉1</option>
        <option value="温泉2">温泉2</option>
        <option value="温泉3">温泉3</option>
      </select>

      <button type="submit">next</button>
    </form>
  </body>
</html>
