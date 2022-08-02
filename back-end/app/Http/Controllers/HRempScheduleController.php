<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

class HRempScheduleController extends Controller
{
    public function schedule()
    {
        $employees=Employee::get();
        if(count($employees)>0){
            return response()->json($employees);
        }
        return response('Employees Not Found', 404)
                  ->header('Content-Type', 'text/plain'); 

    }
}
