<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AlumniController;
use App\Http\Controllers\MerchController;

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);

Route::get('/alumni', [AlumniController::class, 'index']);

Route::get('/merch', [MerchController::class, 'index']);
Route::get('/merch/{id}', [MerchController::class, 'show']);

Route::get('/alumni/job-stats', [AlumniController::class, 'jobStats']);
