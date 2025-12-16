<?php

namespace App\Http\Controllers;

use App\Models\Alumni;
use Illuminate\Http\Request;

class AlumniController extends Controller
{
    /**
     * Mengambil semua data alumni (untuk tabel)
     */
    public function index()
    {
        return response()->json([
            'status' => 'success',
            'data' => Alumni::orderBy('tahun_lulus', 'desc')->get()
        ]);
    }

    /**
     * Mengambil persentase pekerjaan alumni (untuk pie chart)
     */
    public function jobStats()
    {
        $total = Alumni::count();

        if ($total === 0) {
            return response()->json([
                'status' => 'success',
                'data' => []
            ]);
        }

        // Kategori job_sector yang tersedia
        $categories = [
            'maritim_perkapalan',
            'migas',
            'energi_listrik',
            'kimia',
            'konstruksi_infrastruktur',
        ];

        $result = [];

        foreach ($categories as $cat) {
            $count = Alumni::where('job_sector', $cat)->count();
            $percentage = ($count / $total) * 100;

            // Simpan data dengan format angka dua desimal
            $result[$cat] = round($percentage, 2);
        }

        return response()->json([
            'status' => 'success',
            'data' => $result
        ]);
    }
}
