<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOrders extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'customer_id',
        'order_description',
        'total_amount',
        'status',
        'delivered_on',
        'type'
    ];

}
