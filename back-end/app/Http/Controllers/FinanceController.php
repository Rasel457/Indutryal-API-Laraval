<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Organization;

class FinanceController extends Controller
{
    public function index($id){
        $user_finance = User::where('id', $id)->first();
        if($user_finance){
            $user_sales = User::where('organization_id',$user_finance->organization_id)->where('type','sales')->first();
            $user_product = User::where('organization_id',$user_finance->organization_id)->where('type','product')->first();
            $user_hr = User::where('organization_id',$user_finance->organization_id)->where('type','hr')->first();
            $organization = Organization::where('id',$user_finance->organization_id)->first();
            $dashboard_data = array($organization,$user_finance,$user_sales,$user_product,$user_hr);
            return response()->json($dashboard_data, 200);
        }
        $errors = array("error"=>"Not Found","code"=>"404");
        return response()->json($errors, 404);
    }
}
