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
        $this->validate($request, ['lat' => 'required', 'lng' => 'required',]);

        $request->session()->put('onsen', [
            'lat' => $request->lat,
            'lng' => $request->lng,
        ]);
    }
}
