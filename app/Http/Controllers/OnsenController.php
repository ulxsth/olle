<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OnsenController extends Controller
{
    /**
     * セッションに温泉の情報を格納する。
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function storeInSession(Request $request) {
        $request->session()->put('onsen', $request->input('onsen'));
    }
}
