<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RyokanController extends Controller
{
    /**
     * セッションに旅館の情報を格納する。
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function storeInSession(Request $request) {
        $request->session()->put('ryokan', $request->all());
    }
}
