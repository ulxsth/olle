<?php
use App\Http\Controllers\RyokanController;
use App\Http\Controllers\OnsenController;
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

Route::redirect('/', '/start');

// start
// -------------------------------------------------
Route::get('/start', function () {
    return view('start');
})->name('start');

Route::post('/start', function (Request $request) {
    $startController = new RyokanController();
    $startController->storeInSession($request);
    return redirect()->route('flag');
});


// flag
// -------------------------------------------------
Route::get('/flag', function () {
    return view('flag');
})->name('flag');

Route::post('/flag', function (Request $request) {
    $flagController = new OnsenController();
    $flagController->storeInSession($request);
    return redirect()->route('date');
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
