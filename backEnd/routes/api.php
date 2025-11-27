<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AlumniController;

Route::get('/api/news', [NewsController::class, 'index']);
Route::get('/api/news/{id}', [NewsController::class, 'show']);
Route::get('/api/alumni', [AlumniController::class, 'index']);
