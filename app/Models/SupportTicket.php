<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SupportTicket extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'order_id',
        'subject',
        'message',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
