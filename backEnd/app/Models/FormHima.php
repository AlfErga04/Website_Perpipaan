<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormHima extends Model
{
    protected $table = 'form_hima';

    protected $fillable = [
        'name',
        'nim',
        'class',
        'cohort',
        'reason',
        'experience',
        'ktm_file',
        'cv_file',
        'status',
    ];
}
