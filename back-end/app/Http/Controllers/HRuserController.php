<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\User;

class HRuserController extends Controller
{
    public function addUser(Request $req)
    {
        $img = $req->file('profile_pic');
        $user=new User;
        $user->firstname=$req->firstname;
        $user->lastname=$req->lastname;
        $user->username=$req->username;
        $user->email=$req->email;
        $user->phone=$req->phone;
        $user->address=$req->address;
        $user->gender=$req->gender;
        $user->position=$req->position;
        $user->type=$req->type;
        $user->pass=$req->pass;
        $user->work_hour=$req->work_hour; 
        //$user->organization_id=$req->organization_id;
        $user->profile_pic = $req->username.'.'.$img->getClientOriginalExtension();
        $img->move('upload/Users', $req->username.'.'.$img->getClientOriginalExtension());
        $user->save();
       

        return response('User Added', 201)
                  ->header('Content-Type', 'text/plain');  
                   
    }
    public function getUserList()
    {
        $users = User::get();
        if(count($users)>0){
            return response()->json($users);
        }
        return response('Employees Not Found', 404)
                  ->header('Content-Type', 'text/plain');
    }

    public function deleteUser($id)
    {
        if( User::where('id', $id)->delete()){
            return response('User Deleted', 200)
                  ->header('Content-Type', 'text/plain');
        }
        return response('User Not Found', 404)
                  ->header('Content-Type', 'text/plain');  
                         
    }

    public function updateUser(Request $req,$id)
    {
        $user=User::find($id);
        $user->firstname=$req->firstname;
        $user->lastname=$req->lastname;
        $user->username=$req->username;
        $user->email=$req->email;
        $user->phone=$req->phone;
        $user->address=$req->address;
        $user->gender=$req->gender;
        $user->position=$req->position;
        $user->type=$req->type;
        $user->pass=$req->pass;
        $user->work_hour=$req->work_hour;
       
        $user->save();
        return response('User Updated', 200)
                  ->header('Content-Type', 'text/plain'); 

    }
    function searchUser($username)
    {
        return User::where("username",$username)->get();
    }

    public function getUserById($id)
    {
        return User::find($id);
    }
    
}
