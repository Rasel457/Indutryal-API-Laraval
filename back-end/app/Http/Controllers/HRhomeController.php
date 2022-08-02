<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Employee;

class HRhomeController extends Controller
{
    public function index()
     {
      $result=DB::select(DB::raw("SELECT count(*)as number,gender from employees group by gender"));
      
       $chartData=[];
      foreach($result as $list)
      {
          $chartData += [$list->gender=>$list->number];
      }  
      
      return $chartData;
     }
}
