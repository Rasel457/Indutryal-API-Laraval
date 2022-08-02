<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class administration extends Model
{
    protected $table = 'administration';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
