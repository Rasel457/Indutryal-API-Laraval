<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product\leave_request;
use App\Models\Product\activities_table;
use App\Models\Product\administration;

class OtherController extends Controller
{
    public function createLeaveRequest(Request $req)
    {
        $leave = new leave_request;
        $leave->type = $req->type;
        $leave->request_description = $req->request_description;
        $leave->start_time = $req->start_time;
        $leave->end_time = $req->end_time;
        $leave->request_made = date("Y-m-d H:i:s");;
        $leave->status = "Pending";
        $leave->employee_id = 1;

        $result = $leave->save();
        
        if($result)
        {
            return response()->json($result);
        }
        else
        {
            return response('Failed to add request!', 400)
                  ->header('Content-Type', 'text/plain');
        } 
    }

    public function getMyLeaveRequests()
    {
        $allLeaveData = leave_request::all();
        return response()->json($allLeaveData);
    }

    function getRequestByName($name)
    {
        $result = leave_request::where("request_description",'like','%'.$name.'%')->get();
        if(count($result) > 0)
        {
            return response()->json($result);
        }
        else
        {
            return response('Request not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function getActivities()
    {
        $allActivities = activities_table::all();
        return response()->json($allActivities);
    }

    function getActivitiesByType($type)
    {
        $result = activities_table::where("type",'like','%'.$type.'%')->get();
        if(count($result) > 0)
        {
            return response()->json($result);
        }
        else
        {
            return response('Request not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function createAdministrationIssue(Request $req)
    {
        $issue = new administration;
        $issue->issue_name = $req->issue_name;
        $issue->description = $req->description;
        $issue->issued_by = "Product Manager";
        $issue->issue_time = date("Y-m-d H:i:s");
        $issue->status = "Pending";
        $result = $issue->save();
        
        if($result)
        {
            return response()->json($result);
        }
        else
        {
            return response('Failed to add issue!', 400)
                  ->header('Content-Type', 'text/plain');
        } 
    }

    public function getMyIssues()
    {
        $allIssueData = administration::all();
        return response()->json($allIssueData);
    }

    function getIssueByName($name)
    {
        $result = administration::where("issue_name",'like','%'.$name.'%')->get();
        if(count($result) > 0)
        {
            return response()->json($result);
        }
        else
        {
            return response('Issue not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }
}
