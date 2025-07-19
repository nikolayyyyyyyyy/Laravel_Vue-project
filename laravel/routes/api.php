<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\PlanApi;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductApi;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user()->load('plan', 'role');
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/plans', [PlanApi::class, 'index'])->middleware('auth:sanctum');

// Product API routes
Route::prefix('products')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [ProductApi::class, 'index']);
    Route::get('/{id}', [ProductApi::class, 'show']);
    Route::post('/', [ProductApi::class, 'store']);
    Route::put('/{id}/update', [ProductApi::class, 'update']);
    Route::delete('/{id}/delete', [ProductApi::class, 'destroy']);
});