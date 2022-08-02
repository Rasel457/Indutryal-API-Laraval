<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class SigninController extends Controller
{
    //Dummy Verifcation
    public function verify(Request $req){
        $user = User::where('email',$req->email)->where('pass',$req->pass)->first();
        if($user)
        {
            return response()->json($user, 200);
        }
        $errors = array("error"=>"User Does Not Exist or Invalid Username/Password","code"=>"404");
        return response()->json($errors, 404);
    }
}