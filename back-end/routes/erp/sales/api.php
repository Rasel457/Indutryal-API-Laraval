<?php

use App\Http\Controllers\SalesCustomersController;
use App\Http\Controllers\SalesEmailController;
use App\Http\Controllers\SalesOrdersController;
use App\Http\Controllers\SalesProductController;
use App\Http\Controllers\SalesUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/sales/customers', [SalesCustomersController::class, 'index']);
Route::post('/sales/customers', [SalesCustomersController::class, 'store']);
Route::get('/sales/customers/{id}', [SalesCustomersController::class, 'show']);
Route::put('/sales/customers/{id}', [SalesCustomersController::class, 'update']);
Route::delete('/sales/customers/{id}', [SalesCustomersController::class, 'destroy']);
Route::get('/sales/customers/search/{name}', [SalesCustomersController::class, 'search']);

Route::get('/sales/orders', [SalesOrdersController::class, 'index']);
Route::post('/sales/orders', [SalesOrdersController::class, 'store']);
Route::get('/sales/order/{id}', [SalesOrdersController::class, 'show']);
Route::put('/sales/order/{id}', [SalesOrdersController::class, 'update']);
Route::delete('/sales/orders/{id}', [SalesOrdersController::class, 'destroy']);
Route::get('/sales/orders/search/{name}', [SalesOrdersController::class, 'search']);

Route::get('/sales/user/{id}', [SalesUserController::class, 'show']);
Route::get('/sales/user/propic/{id}', [SalesUserController::class, 'getImage']);
Route::put('/sales/user/{id}', [SalesUserController::class, 'update']);
Route::post('/sales/user/', [SalesUserController::class, 'getPassword']);
Route::put('/sales/password', [SalesUserController::class, 'setPassword']);

Route::get('/sales/products/all', [SalesProductController::class, 'index']);

Route::get('/sales/email/all', [SalesEmailController::class, 'index']);
Route::get('/sales/email/from', [SalesEmailController::class, 'from']);
Route::get('/sales/email/to', [SalesEmailController::class, 'to']);