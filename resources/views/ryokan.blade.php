<html>
  <body>
    <h1>STEP1</h1>
    <form action="/ryokan" method="post">
      @csrf
      <label for="ryokan">旅館</label>
      <select name="ryokan" id="ryokan">
        <option value="旅館1">旅館1</option>
        <option value="旅館2">旅館2</option>
        <option value="旅館3">旅館3</option>
      </select>

      <button type="submit">next</button>
    </form>
  </body>
</html>
