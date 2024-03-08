<?php
use App\Http\Controllers\StartController;
use App\Http\Controllers\FlagController;
use App\Http\Controllers\DateController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get("/", function () {
    return view('home');
});

// start
// -------------------------------------------------
Route::get('/start', function () {
    return view('start');
})->name('start');

Route::post('/start', function (Request $request) {
    $startController = new StartController();
    $startController->storeInSession($request);
    return redirect()->route('flags');
});


// flag
// -------------------------------------------------
Route::get('/flags', function () {
    return view('flags');
})->name('flags');

Route::post('/flags', function (Request $request) {
    $flagController = new FlagController();
    $flagController->storeInSession($request);
    return redirect()->route('result');
});


// date
// -------------------------------------------------
Route::get('/date', function () {
    return view('date');
})->name('date');

Route::post('/date', function (Request $request) {
    $dateController = new DateController();
    $dateController->storeInSession($request);
    return redirect()->route('result');
});

// result
// -------------------------------------------------
Route::get('/result', function () {
    return view('result');
})->name('result');

// 言語切り替え
Route::get('/language/{lang}', \App\Http\Controllers\LanguageController::class)->name('language.switch');
