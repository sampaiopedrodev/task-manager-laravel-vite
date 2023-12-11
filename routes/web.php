<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/{any}', \App\Http\Controllers\ApplicationController::class)->where('any', '^(?!api).*$');
Route::fallback(function() {
    return response()->json(['message' => 'Opps, Method Not Allowed!'], 405);
});
