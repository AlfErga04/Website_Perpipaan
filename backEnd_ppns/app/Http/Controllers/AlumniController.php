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
        $alumni = Alumni::orderBy('tahun_lulus', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'data'   => $alumni
        ]);
    }

    /**
     * Mengambil persentase pekerjaan alumni (untuk pie chart)
     */
    public function jobStats()
    {
        $total = Alumni::count();

        // Jika tidak ada data
        if ($total === 0) {
            return response()->json([
                'status' => 'success',
                'data'   => [],
                'message' => 'Tidak ada data alumni.'
            ]);
        }

        // Daftar kategori job_sector
        $categories = [
            'maritim_perkapalan',
            'migas',
            'energi_listrik',
            'kimia',
            'konstruksi_infrastruktur',
            'lain_lain'
        ];

        $result = [];

        foreach ($categories as $cat) {
            $count = Alumni::where('job_sector', $cat)->count();
            $percentage = $count > 0 ? round(($count / $total) * 100, 2) : 0;

            $result[] = [
                'sector' => $cat,
                'count' => $count,
                'percentage' => $percentage
            ];
        }

        return response()->json([
            'status' => 'success',
            'total_alumni' => $total,
            'data' => $result
        ]);
    }
}
