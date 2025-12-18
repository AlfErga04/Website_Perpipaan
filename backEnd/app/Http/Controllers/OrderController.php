<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;
use App\Models\Merch;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

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
            'no_whatsapp' => 'required|string',
            'ktm_path' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'id_item' => 'required|integer',
            'quantity' => 'required|integer|min:1',
        ]);
        $ktmPath = $request->file('ktm_path')->store('ktm_files', 'public');

        // ensure merch exists and has enough stock
        $merch = Merch::findOrFail($request->id_item);
        if (($merch->quantity ?? 0) < $request->quantity) {
            return response()->json(['message' => 'Not enough stock for this item'], 400);
        }

        // create order and decrement stock atomically
        $order = null;
        DB::beginTransaction();
        try {
            // decrement merch stock
            $merch->decrement('quantity', $request->quantity);

            // create order for this user
            $order = Order::create([
                'user_id' => $request->user()->id,
                'id_order' => random_int(100000, 999999),
                'no_whatsapp' => $request->no_whatsapp,
                'order_date' => now(),
                'order_status' => 'dikonfirmasi',
                'id_item' => $request->id_item,
                'quantity' => $request->quantity,
                'ktm_path' => $ktmPath,
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create order'], 500);
        }

        return response()->json($order, 201);
    }

    // POST /api/orders/{id}/decrement
    public function decrement(Request $request, $id)
    {
        $user = $request->user();
        $order = $user->orders()->findOrFail($id);

        if ($order->quantity > 1) {
            $order->decrement('quantity');
            $order->save();
        }

        return response()->json($order);
    }

    // GET /api/orders/{id}
    public function show(Request $request, $id)
    {
        $user = $request->user();
        $order = $user->orders()->findOrFail($id);
        return response()->json($order);
    }

    // Admin: get all orders
    public function all(Request $request)
    {
        // optional: check for admin privilege here
        $orders = Order::with('user')->latest()->get();
        return response()->json($orders);
    }

    // Admin: update order status
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'order_status' => 'required|string',
            'admin_note' => 'nullable|string',
        ]);

        $order = Order::findOrFail($id);
        $order->order_status = $request->order_status;
        // only set admin_note if provided; allow clearing by sending null
        if ($request->has('admin_note')) {
            $order->admin_note = $request->admin_note;
        }
        $order->save();

        return response()->json($order);
    }

    // User: mark own order as completed (when they've picked it up)
    public function complete(Request $request, $id)
    {
        $user = $request->user();
        $order = $user->orders()->findOrFail($id);

        // Only allow completion if status indicates ready for pickup
        $status = strtolower($order->order_status ?? '');
        if (!str_contains($status, 'siap') && !str_contains($status, 'siap diambil')) {
            return response()->json(['message' => 'Order not ready for completion'], 400);
        }

        $order->order_status = 'selesai';
        $order->save();

        return response()->json($order);
    }
}
;
