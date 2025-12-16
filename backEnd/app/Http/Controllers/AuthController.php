<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Register function
    public function register(Request $request)
    {
        // Check if user already exists
        $nim = User::where('nim', $request->nim)->first();
        if ($nim) {
            return response()->json([
                'message' => 'NIM sudah terdaftar!',
            ], 409);
        }

        $email = User::where('email', $request->email)->first();
        if ($email) {
            return response()->json([
                'message' => 'Email sudah terdaftar!',
            ], 409);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'nim' => 'required|string|unique:users,nim',
            'gender' => 'required|string|max:10',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'nim' => $request->nim,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User sukses dibuat!',
            'user' => $user,
        ], 201);
    }

    // Login function
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Email atau password salah!',
            ], 401);
        }

        return response()->json([
            'message' => 'Login sukses!',
            'user' => $user,
        ], 200);
    }
}
