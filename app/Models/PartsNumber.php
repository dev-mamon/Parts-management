<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartsNumber extends Model
{
    protected $fillable = ['product_id', 'part_number'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
