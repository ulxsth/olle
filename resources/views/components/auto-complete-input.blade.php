@php
    $placeholder = "ここに入力";
    if ($type === 'ryokan') {
        $placeholder = "旅館名を入力";
    }
@endphp

<input id="pac-input" type="text" placeholder="{{ $placeholder }}" />

