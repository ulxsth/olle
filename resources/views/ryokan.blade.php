<html>
  <body>
    <h1>STEP1</h1>
    <form action="/ryokan" method="post">
      @csrf
      <label for="onsen">旅館</label>
      <select name="onsen" id="onsen">
        <option value="1">旅館1</option>
        <option value="2">旅館2</option>
        <option value="3">旅館3</option>
      </select>

      <button type="submit">next</button>
    </form>
  </body>
</html>
