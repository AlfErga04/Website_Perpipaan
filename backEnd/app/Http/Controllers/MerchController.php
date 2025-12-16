<?php

namespace App\Http\Controllers;

use App\Models\Merch;
use Illuminate\Http\Request;

class MerchController extends Controller
{
    public function index()
    {
        return Merch::all();
    }

    public function show($id)
    {
        return Merch::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required',
            'description' => 'nullable',
            'price'       => 'required|integer',
            'image'       => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('merch', 'public');
        }

        return Merch::create($validated);
    }

    public function update(Request $request, $id)
    {
        $merch = Merch::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'required',
            'description' => 'nullable',
            'price'       => 'required|integer',
            'image'       => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('merch', 'public');
        }

        $merch->update($validated);

        return $merch;
    }

    public function destroy($id)
    {
        $merch = Merch::findOrFail($id);
        $merch->delete();

        return response()->json(['message' => 'Deleted']);
    }
}
