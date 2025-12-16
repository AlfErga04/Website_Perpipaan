<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AlumniController extends Controller
{
    public function index()
    {
    return response()->json([
        'status' => 'success',
        'data' => Alumni::orderBy('tahun_lulus', 'desc')->get()
    ]);
    }
}