@php
    $placeholder = "";
    if ($type === 'ryokan') {
        $placeholder = "旅館名を入力";
    }
@endphp

@if ($type === 'ryokan')
  <input id="pac-input" type="text" placeholder="{{ $placeholder }}" />
@endif
