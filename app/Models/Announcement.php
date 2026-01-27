<?php

namespace App\Models;

use App\Helpers\Helper;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = ['title', 'image_path', 'is_active'];

    public function getImagePathAttribute($value)
    {
        return Helper::generateURL($value);
    }
}
