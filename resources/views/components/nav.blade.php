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
    {{--public/js/auto-complete.jsで使うためidを追加 --}}
    <input type="submit" form="nav-submit" class="nav__btn nav__btn--prev" id="prev-button" value="戻る" />
    @endif
    {{-- public/js/auto-complete.jsで使うためidを追加 --}}
    <input type="submit" form="nav-submit" class="nav__btn nav__btn--next" id="next-button" value="次に進む" />
</nav>