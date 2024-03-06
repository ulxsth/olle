@php
    $uri = \Illuminate\Support\Facades\Request::path();
    $step = 1;
    $message = '出発地点';
    switch ($uri) {
        case 'onsen':
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
    <div class="circle-step circle-step{{$step}}">
        <div class="circle-step__inner">{{$step}}/3</div>
    </div>
    <div class="header-message">
        <p class="header-message__content">{{$message}}を選んでください</p>
    </div>
</header>
