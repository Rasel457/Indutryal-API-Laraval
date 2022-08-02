<?php

namespace App\Models\Product;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class leave_request extends Model
{
    protected $table = 'leave_request';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
