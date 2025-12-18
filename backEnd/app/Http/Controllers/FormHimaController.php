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
        // $data = $request->only(['nama', 'nim', 'kelas', 'angkatan', 'alasan', 'pengalaman', 'fileNames', 'file_names']);

        // Normalize file names field (frontend sends fileNames)
        // if (isset($data['fileNames'])) {
        //     $data['file_names'] = $data['fileNames'];
        //     unset($data['fileNames']);
        // }

        $request->validate([
            'name' => 'required|string|max:255',
            'nim' => 'required|string|max:100',
            'class' => 'required|string|max:100',
            'cohort' => 'required|string|max:20',
            'reason' => 'nullable|string',
            'experience' => 'nullable|string',
            'ktm_file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'cv_file' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // prevent duplicate active submissions for same NIM
        $existing = FormHima::where('nim', $request->nim)
            ->where('status', '!=', 'rejected')
            ->latest()
            ->first();

        if ($existing) {
            return response()->json([
                'message' => 'You already have an active submission.',
                'data' => $existing,
            ], 409);
        }

        // 🔴 BLOK JIKA MASIH PENDING / ACCEPTED
        $exists = FormHima::where('nim', $request->nim)
            ->whereIn('status', ['pending', 'accepted'])
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Kamu sudah mengirim pendaftaran dan masih diproses / sudah diterima.'
            ], 409); // Conflict
        }

        $form = FormHima::create([
            'name' => $request->name,
            'nim' => $request->nim,
            'class' => $request->class,
            'cohort' => $request->cohort,
            'reason' => $request->reason ?? "",
            'experience' => $request->experience ?? "",
            'ktm_file' => $request->file('ktm_file')->store('form_ktm_file', 'public'),
            'cv_file' => $request->file('cv_file')->store('form_cv_file', 'public'),
            'status' => 'pending',
        ]);

        return response()->json(['success' => true, 'data' => $form], 201);
    }

    /**
     * Admin: list all submissions
     */
    public function index(Request $request)
    {
        // optional: add admin check here
        $nim = $request->query('nim');
        if ($nim) {
            $items = FormHima::where('nim', $nim)->latest()->get();
            return response()->json($items);
        }

        $items = FormHima::latest()->get();
        return response()->json($items);
    }

    /**
     * Public: check submissions by nim (no auth required)
     */
    public function check(Request $request)
    {
        $nim = $request->query('nim');
        if (!$nim)
            return response()->json([]);
        $items = FormHima::where('nim', $nim)->latest()->get();
        return response()->json($items);
    }

    /**
     * Admin: update status (accepted/rejected/pending)
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:pending,accepted,rejected',
        ]);

        $item = FormHima::findOrFail($id);
        $item->status = $request->status;
        $item->save();

        return response()->json($item);
    }
}
