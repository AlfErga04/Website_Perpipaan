<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{

    protected $table = 'alumni';

    use HasFactory;

    protected $fillable = [
        'nim',
        'name',
        'tahun_masuk',
        'tahun_lulus',
        'job_sector'
    ];
}