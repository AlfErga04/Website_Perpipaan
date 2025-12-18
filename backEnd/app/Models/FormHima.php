<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormHima extends Model
{
    protected $table = 'form_himas';

    protected $fillable = [
        'nama',
        'nim',
        'kelas',
        'angkatan',
        'alasan',
        'pengalaman',
        'file_names',
    ];

    protected $casts = [
        'file_names' => 'array',
    ];
}
