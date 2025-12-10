<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\AlumniController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{id}', [NewsController::class, 'show']);
Route::get('/alumni', [AlumniController::class, 'index']);

// Example only
Route::post('/login', function(Request $request) {

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Email atau password salah'
        ], 401);
    }

    return response()->json([
        'message' => 'Login berhasil!',
        'user' => $user,
        'token' => base64_encode($user->email) // dummy token
    ]);
});

Route::post('/register', function(Request $request) {

    $request->validate([
        'name' => 'required',
        'nim' => 'required|unique:users,nim',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'gender' => 'required|in:male,female'
    ]);

    $user = User::create([
        'name' => $request->name,
        'nim' => $request->nim,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'gender' => $request->gender,
    ]);

    return response()->json([
        'message' => 'Registrasi berhasil!',
        'user' => $user,
        'token' => base64_encode($user->email) // sementara, bukan JWT asli
    ]);
});