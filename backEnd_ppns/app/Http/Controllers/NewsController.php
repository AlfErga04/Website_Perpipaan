<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
    return response()->json([
        'status' => 'success',
        'data' => News::latest()->get()
    ]);
    }

    public function show($id)
    {
    $news = News::findOrFail($id);

    return response()->json([
        'status' => 'success',
        'data' => $news
    ]);
    }
}