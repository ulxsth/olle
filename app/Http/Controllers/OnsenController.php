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
        $this->validate($request, ['pac-lng' => 'required', 'pac-lat' => 'required',]);

        $request->session()->put('onsen', [
            'lat' => $request->input('pac-lat'),
            'lng' => $request->input('pac-lng'),
        ]);
    }
}