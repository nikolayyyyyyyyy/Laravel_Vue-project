<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApi;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


//public Product API routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductApi::class, 'index']);
    Route::get('/{id}', [ProductApi::class, 'show']);
});

// Product API routes
Route::prefix('products')->middleware('auth:sanctum')->group(function () {
    Route::post('/', [ProductApi::class, 'store']);
    Route::put('/{id}/update', [ProductApi::class, 'update']);
    Route::delete('/{id}/delete', [ProductApi::class, 'destroy']);
});