<nav class="nav">
    @if ($hidePrev)
        <div></div>
    @else
        <button class="nav__btn nav__btn--prev">戻る</button>
    @endif
    <button type="submit" class="nav__btn nav__btn--next">次に進む</button>
</nav>