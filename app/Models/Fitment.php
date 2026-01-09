<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fitment extends Model
{
    protected $fillable = [
        'product_id',
        'year_from',
        'year_to',
        'make',
        'model',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
