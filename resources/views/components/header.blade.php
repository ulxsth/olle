@php
    $uri = \Illuminate\Support\Facades\Request::path();
    $step = 1;
    $message = '出発地点';
    switch ($uri) {
        case 'flags':
            $step = 2;
            $message = '通過地点';
            break;
        case 'date':
            $step = 3;
            $message = '日付';
            break;
    }
@endphp

<header class="header">
    <div class="circle-step circle-step{{ $step }}">
        <div class="circle-step__inner">{{ $step }}/3</div>
    </div>
    <div class="header-message">
    <ul>
        <li><a href="{{ route('language.switch', 'ja') }}">JP</a></li>
        <li><a href="{{ route('language.switch', 'en') }}">EN</a></li>
    </ul>
        <p class="header-message__content">{{ __('messages.serectPoint') }}</p>
    </div>
</header>
