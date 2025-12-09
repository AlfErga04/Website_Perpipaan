<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
    ];

    // Jika kamu ingin otomatis generate URL file image
    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image
            ? url('storage/' . $this->image)
            : null;
    }
}
