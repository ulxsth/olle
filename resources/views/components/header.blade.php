@php
$uri = \Illuminate\Support\Facades\Request::path();
$step = 1;
$message = '出発地点を選んでください';
switch ($uri) {
case 'flags':
$step = 2;
$message = '通過地点を選んでください';
break;
case 'result':
$step = 3;
$message = '結果を表示しています';
break;
}
@endphp

<header class="header">
    <div class="circle-step circle-step{{ $step }}">
        <div class="circle-step__inner">{{ $step }}/3</div>
    </div>
    <div class="header-message">
        <p class="header-message__content">{{ __('messages.serectPoint') }}</p>
    </div>
    <details class="header__language-select">
        <summary class="header__language-select__icon">
            <article>
                <img src="/img/lang.png" alt="lang">
            </article>
        </summary>
        <ul class="header__language-select__list">
            <li><a href="{{ route('language.switch', 'ja') }}">JP</a></li>
            <li><a href="{{ route('language.switch', 'en') }}">EN</a></li>
        </ul>
    </details>
</header>
