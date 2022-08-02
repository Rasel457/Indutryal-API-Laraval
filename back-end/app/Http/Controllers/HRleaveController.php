<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Leave;
use App\Models\User;

class HRleaveController extends Controller
{
    public function verifyLeave(Request $req,$username)
    {
       
        $user = User::where('username', $username)->first();
        $emp_id = $user->id;
        $emp_type = $user->type;
        
        $leave = new Leave;

        $leave->employee_id = $emp_id;
        $leave->type = $req->type;
        $leave->request_description = $req->description;
        $leave->start_time = $req->start_date;
        $leave->end_time = $req->end_date;
        $leave->request_made = date("Y-m-d H:i:s");
        $leave->status = "Pending";

        $leave->save();
        return response('Leave Request Sent', 201)
                  ->header('Content-Type', 'text/plain'); 
       
    }
    public function getLeaveList()
    {
       
       $leaves = Leave::get();
      
       if(count($leaves)>0){
            return response()->json($leaves);
        }
        return response('Not Found', 404)
                  ->header('Content-Type', 'text/plain'); 
    }
    public function getPendingList()
    {
        $leave = Leave::where('status', 'Pending')->get();
        return response()->json($leave);
    }

    public function VerifyApprove($id,Request $req)
    {
        $leave = Leave::where('id', $id)->first();
        if($leave->status=="Pending")
        {
            $leave->status="Approved";
            $leave->save();
            return response('Leave Request Approved', 200)
                  ->header('Content-Type', 'text/plain');
            
        }
        else
        {
            return response('Failed!!!', 404)
                  ->header('Content-Type', 'text/plain');
        }
        
        
    }
    public function VerifyReject($id,Request $req )
    {
        $leave = Leave::where('id', $id)->first();
        if($leave->status=="Pending")
        {
            $leave->status="Declined";
            $leave->save();
            return response('Leave Request Rejected', 200)
                  ->header('Content-Type', 'text/plain');
        }
         else
        {
            return response('Failed!!!', 404)
            ->header('Content-Type', 'text/plain');
        } 
       
        
        
    }
    public function getLeaveById($id)
    {
        return Leave::find($id);
    }
}
