<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
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

//Auth Routes
Route::post('/login',[AuthController::class,'login']);

// Customers Routes
Route::post('/customer',[CustomerController::class,'store']);
Route::put('/customer',[CustomerController::class,'update']);
Route::get('/customers',[CustomerController::class,'allCustomers']);
Route::delete('customer/{customer}', [CustomerController::class, 'destroy']);



