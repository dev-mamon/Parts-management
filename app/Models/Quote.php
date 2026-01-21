<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $fillable = [
        'user_id',
        'quote_number',
        'title',
        'status',
        'valid_until',
        'total_amount',
        'items_count',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(QuoteItem::class);
    }
}
