<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormHima;

class FormHimaController extends Controller
{
    /**
     * Public: store a new form submission
     */
    public function store(Request $request)
    {
        $data = $request->only(['nama', 'nim', 'kelas', 'angkatan', 'alasan', 'pengalaman', 'fileNames', 'file_names']);

        // Normalize file names field (frontend sends fileNames)
        if (isset($data['fileNames'])) {
            $data['file_names'] = $data['fileNames'];
            unset($data['fileNames']);
        }

        $request->validate([
            'nama' => 'required|string|max:255',
            'nim' => 'required|string|max:100',
            'kelas' => 'nullable|string|max:100',
            'angkatan' => 'nullable|string|max:20',
            'alasan' => 'nullable|string',
            'pengalaman' => 'nullable|string',
            'file_names' => 'nullable|array',
        ]);

        $form = FormHima::create([
            'nama' => $data['nama'] ?? null,
            'nim' => $data['nim'] ?? null,
            'kelas' => $data['kelas'] ?? null,
            'angkatan' => $data['angkatan'] ?? null,
            'alasan' => $data['alasan'] ?? null,
            'pengalaman' => $data['pengalaman'] ?? null,
            'file_names' => $data['file_names'] ?? null,
        ]);

        return response()->json(['success' => true, 'data' => $form], 201);
    }

    /**
     * Admin: list all submissions
     */
    public function index(Request $request)
    {
        // optional: add admin check here
        $items = FormHima::latest()->get();
        return response()->json($items);
    }
}
