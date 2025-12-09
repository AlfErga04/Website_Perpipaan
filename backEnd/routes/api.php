<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AlumniController;

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);
Route::get('/alumni', [AlumniController::class, 'index']);

// Example only
Route::post('/login', function(Request $request) {
    if ($request->email === 'admin@gmail.com' && $request->password === '123456') {
        return response()->json([
            'message' => 'Login success',
            'token' => 'dummy-jwt-token-123',
            'user' => [
                'name' => 'Admin',
                'email' => $request->email
            ]
        ]);
    }

    return response()->json([
        'message' => 'Invalid credentials'
    ], 401);
});

Route::post('/register', function(Request $request) {
    if (!$request->email || !$request->password || !$request->name || !$request->nim) {
        return response()->json([
            'message' => 'Semua field harus terisi'
        ], 400);
    }

    return response()->json([
        'message' => 'Data berhasil dibuat!',
        'token' => 'dummy-jwt-token-123',
        'user' => [
            'name' => $request->name,
            'email' => $request->email,
            'nim' => $request->nim
        ]
    ]);
});