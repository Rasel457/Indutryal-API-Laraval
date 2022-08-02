<?php

namespace App\Models\Sales;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesUser extends Model
{
    use HasFactory;
    protected $table = 'users';
    protected $fillable = [
        'firstname',
        'lastname',
        'username',
        'email',
        'phone',
        'address',
        'position',
        'work_hour',
        'pass',
    ];
}
