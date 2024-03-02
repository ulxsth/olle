@extends('app')

@section('content')
<form action="/ryokan" method="post">
    @csrf
    <x-auto-complete-input type="ryokan" />
    <button type="submit">next</button>
</form>
@endsection
