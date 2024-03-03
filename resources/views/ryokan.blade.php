@extends('app')

@section('content')
@include('components.header')
<form action="/ryokan" method="post">
    @csrf
    <x-auto-complete-input type="ryokan" placeholder="旅館名を入力" />
    <button type="submit">next</button>
</form>
@include('components.nav')
@endsection
