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
    public function storeInSession(Request $request)
    {
        $this->validate($request, ['lat' => 'required', 'lng' => 'required',]);

        $request->session()->put('ryokan', [
            'lat' => $request->lat,
            'lng' => $request->lng,
        ]);
    }
}
