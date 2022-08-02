<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Employee;

class HRgroupController extends Controller
{
    public function createGroup(Request $req)
    {
       $employee = Employee::where('employee_id',$req->employee_id)->value('employee_group');
        if($employee == 'N/A')
        {
            $employee1 = Employee::where('employee_id', $req->employee_id)->first();
            $employee1->employee_group = $req->employee_group;
            $employee1->save();          
        }
        return response('Employee Added to Group', 201)
                  ->header('Content-Type', 'text/plain');

    }
}
