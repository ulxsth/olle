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
        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $request->session()->put('onsen', [
            'lat' => $request->lat,
            'lng' => $request->lng,
        ]);
    }
}
