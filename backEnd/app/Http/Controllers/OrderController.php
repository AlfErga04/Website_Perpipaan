<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    // GET /api/orders
    public function index(Request $request)
    {
        // order requesting to this user
        $user = $request->user();
        // get user order
        $orders = $user->orders()->latest()->get();

        return response()->json($orders);
    }

    // POST /api/orders
    public function store(Request $request)
    {
        // when user request order to db
        $request->validate([
            'item_name' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric',
        ]);

        // create order for this user
        $order = Order::create([
            'order_code' => random_int(100000, 999999),
            'user_id' => $request->user()->id,
            'order_status' => 'dikonfirmasi',
            'order_date' => now(),
            'item_name' => $request->item_name,
            'quantity' => $request->quantity,
            'price' => $request->price,
        ]);

        return response()->json($order, 201);
    }

    // GET /api/orders/{id}
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $order = $user->orders()->findOrFail($id);
        return response()->json($order);
    }
};
