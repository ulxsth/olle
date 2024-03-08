@php
    $uri = \Illuminate\Support\Facades\Request::path();
    $hidePrevBtn = false;
    if ($uri === 'start') {
        $hidePrevBtn = true;
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
