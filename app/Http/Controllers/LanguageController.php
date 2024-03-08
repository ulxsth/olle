<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LanguageController extends Controller
{
    public function __invoke($lang)
    {
        App::setLocale($lang);
        Session::put('locale', $lang);
        return back();
    }
}
