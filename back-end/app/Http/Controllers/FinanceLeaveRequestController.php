<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Finance\LeaveRequest;
use App\Models\Finance\Leave;
use Carbon\Carbon;

class FinanceLeaveRequestController extends Controller
{
    public function index_list($id){
        $leaves = Leave::where('employee_id',$id)->get();
        if($leaves){
            return response()->json($leaves, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function apply(LeaveRequest $req, $id){
        $leave = new Leave;
        $leave->type = $req->type;
        $leave->request_description = $req->request_description;
        $leave->start_time = $req->start_time;
        $leave->end_time = $req->end_time;
        $leave->employee_id = $id;
        $leave->request_made = Carbon::now();
        $leave->status = 'Pending';
        $leave->save();
        $success = array("success"=>"Leave Request Posted","code"=>"200");
        return response()->json($success, 200);
    }
    
    public function delete($id){
        if(Leave::destroy($id)){
            $success = array("success"=>"Leave Request Deleted","code"=>"200");
            return response()->json($success, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
}
