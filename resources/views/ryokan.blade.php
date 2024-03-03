@extends('app')

@include('components.header')
@section('content')
<form action="/ryokan" method="post">
    @csrf
    <x-auto-complete-input type="ryokan" placeholder="旅館名を入力" />
    <button type="submit">next</button>
</form>
@endsection
