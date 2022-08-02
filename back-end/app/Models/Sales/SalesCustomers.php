<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesCustomers extends Model
{
    protected $table = 'customers';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'email',
        'phone',
        'delivery_point',
        'first_purchase',
        'type',
        'updated_at'
    ];
}
