<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    protected $fillable = [
        'shop_name',
        'name',
        'contact_number',
        'email',
        'street_address',
        'unit_number',
        'city',
        'province',
        'postcode',
        'country',
        'notes',
        'vehicle_info',
        'vin',
        'color_code',
        'engine_size',
    ];

    public function parts()
    {
        return $this->hasMany(LeadPart::class);
    }
}
