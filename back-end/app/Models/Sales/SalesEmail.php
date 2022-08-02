<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesEmail extends Model
{
    protected $table = 'customer_emails';
    public $timestamps = false;
    protected $fillable = [
        'id',
        'sent_from',
        'sent_to',
        'content',
        'sent_datetime',
        'status',
    ];
}
