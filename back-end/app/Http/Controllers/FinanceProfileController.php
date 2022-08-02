<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Finance\ProfileUpdateRequest;
use App\Models\User;

class FinanceProfileController extends Controller
{
    public function index($id){
        $user_finance = User::where('id',$id)->first();
        if($user_finance){
            return response()->json($user_finance, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function update(ProfileUpdateRequest $req,$id){
        $user_finance = User::find($id);
        $img = $req->file('pp');
        $user_finance->profile_pic = uniqid().".".$img->getClientOriginalExtension();
        $img->move('upload/Users', $user_finance->profile_pic);
        $user_finance->save();
        $success = array("success"=>"Profile Updated","code"=>"200");
        return response()->json($success, 200);
    }
}
