<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    //
    protected $fillable = [
        'name',
        'user_id',
        'no_whatsapp',
        'ktm_path',
        'id_order',
        'order_date',
        'order_status',
        'id_item',
        'quantity',
        'admin_note',
    ];

    protected $casts = [
        'order_date' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
