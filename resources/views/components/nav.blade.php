@php
    $uri = \Illuminate\Support\Facades\Request::path();
    $hidePrevBtn = false;
    if ($uri === 'start') {
        $hidePrevBtn = true;
    }

    $message = '次に進む';
    if($uri === 'flags') {
        $message = '結果を見る';
    }else if($uri === 'result') {
        $message = '最初に戻る';
    }
@endphp

<nav class="nav">
    @if ($hidePrevBtn)
        <div></div>
    @else
        <button class="nav__btn nav__btn--prev" id="prev-button" onclick="window.history.back()">{{ __('messages.back') }}</button>
    @endif
    <input type="submit" form="nav-submit" id="next-button" class="nav__btn nav__btn--next" value="{{ __('messages.next') }}" />
</nav>
