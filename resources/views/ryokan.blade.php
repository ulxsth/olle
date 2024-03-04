@extends('app')

@section('content')
@php
$step = 1;
$message = "旅館";
$hidePrev = true;
@endphp
<form action="/ryokan" method="post">
    <x-header :step="$step" :message="$message" />
    <main class="main">
        @csrf
        <x-auto-complete-input name="ryokan" type="ryokan" placeholder="旅館名を入力" />
    </main>
    <x-nav :hidePrev="$hidePrev" />
</form>
@endsection
