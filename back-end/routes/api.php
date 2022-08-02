<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SigninController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

//COMMON LOGIN
//Route::post('login', ['as'=>'login.verify', 'uses'=>'SigninController@verify']);
Route::post("login",[SigninController::class,'verify']);

//ADMIN SIGNUP
Route::post('signup', ['as'=>'signup.verify', 'uses'=>'SignupController@verify']);