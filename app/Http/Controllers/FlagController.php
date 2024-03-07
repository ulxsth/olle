<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FlagController extends Controller
{
    /**
     * セッションに通過地点の情報を格納する。
     * @param \Illuminate\Http\Request $request
     * @return void
     */
    public function storeInSession(Request $request)
    {
        $this->validate($request, ['pac-lng' => 'required', 'pac-lat' => 'required',]);

        $request->session()->put('flag', [
            'lat' => $request->input('pac-lat'),
            'lng' => $request->input('pac-lng'),
        ]);
    }
}
