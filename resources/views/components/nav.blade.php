@php
    $uri = \Illuminate\Support\Facades\Request::path();
    $hidePrevBtn = false;
    if($uri === 'ryokan') {
        $hidePrevBtn = true;
    }
@endphp

<nav class="nav">
    @if ($hidePrevBtn)
        <div></div>
    @else
        <button class="nav__btn nav__btn--prev" onclick="window.history.back()">戻る</button>
    @endif
    <input type="submit" form="nav-submit" class="nav__btn nav__btn--next" value="次に進む" />
</nav>