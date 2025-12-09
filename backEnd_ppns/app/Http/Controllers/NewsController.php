<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
    {
    $news = News::latest()->get()->map(function($item){
        $item->image_url = $item->image ? url('storage/' . $item->image) : null;
        return $item;
    });

    return response()->json([
        'status' => 'success',
        'data' => $news
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