<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\MerchController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FormHimaController;


Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::get('/news', [NewsController::class, 'index'])->name('news');
Route::get('/news/{id}', [NewsController::class, 'show']);

Route::get('/alumni', [AlumniController::class, 'index'])->name('alumni');

Route::get('/merch', [MerchController::class, 'index']);
Route::get('/merch/{id}', [MerchController::class, 'show']);

Route::get('/alumni/job-stats', [AlumniController::class, 'jobStats']);

// Public form submission
Route::post('/form-hima', [FormHimaController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/decrement', [OrderController::class, 'decrement']);
    // Admin: list all orders and update order status
    Route::get('/admin/orders', [OrderController::class, 'all']);
    Route::patch('/admin/orders/{id}', [OrderController::class, 'updateStatus']);
    // User: mark own order as completed
    Route::patch('/orders/{id}/complete', [OrderController::class, 'complete']);
    // Admin: view all form-hima submissions
    Route::get('/form-hima', [FormHimaController::class, 'index']);
});