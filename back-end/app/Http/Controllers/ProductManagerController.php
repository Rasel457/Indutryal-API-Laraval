<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Mail;

class ProductManagerController extends Controller
{
    public function getUserInfo($username)
    {
        $info = User::where('username',$username)->get();
        if(count($info))
        {
            return response()->json($info);
        }
        else
        {
            return response('User not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function updateUserInfo(Request $req, $username)
    {
        $info = User::where('username',$username)->first();
        if($info->pass == $req->password)
        {
            $info->firstname = $req->firstName;
            $info->lastname = $req->lastName;
            $info->phone = $req->phoneNumber;
            $info->email = $req->email;
            $info->address = $req->address;
            $result = $info->save();
            if($result)
            {
                return response()->json($info);
            }
            else
            {
                return response('Failed to update profile!', 400)
                    ->header('Content-Type', 'text/plain');
            }
        }
        else
        {
            return "Incorrect current passowrd!";
        }
    }

    public function updateProfilePicture(Request $req, $username)
    {
        $img = $req->file('profile_pic');
        $info = User::where('username',$username)->first();
        if($info->pass == $req->pass)
        {
            $info->profile_pic = $username.'.'.$img->getClientOriginalExtension();
            $result = $info->save();
            $img->move('upload/Users', $username.'.'.$img->getClientOriginalExtension());
            if($result)
            {
                return response()->json($info);
            }
            else
            {
                return response('Failed to update profile picture!', 400)
                    ->header('Content-Type', 'text/plain');
            }
        }
        else
        {
            return "Incorrect current passowrd!";
        }
    }

    public function changePasswordVerify(Request $req)
    {
        $curr_pass = $req->currPass;
        $new_pass = $req->newPass;
        $confirm_new_pass = $req->confirmNewPass;
        $username = $req->username;
        
        // get user details
        $currUser = User::where("username",$username)->first();
        if($curr_pass == $currUser->pass)
        {
            //email verification
            $v_code = $this->gen_verify_code();
            $data = ['username'=>$username, 'code' => $v_code];
            $curr_user['to'] = $currUser->email; // email should be dynamic
            Mail::send('Product.User.mail',$data,function($messages) use ($curr_user){
                $messages->to($curr_user['to']);
                $messages->subject('Change Password - Industryal');
            });

            return $v_code;
        }
        else
        {
            return "NOT OK";
        }
    }

    public function verificationVerify(Request $req)
    {
        $username = $req->username;
        $currUser = User::where("username",$username)->first();

        $currUser->pass = $req->password;
        $result = $currUser->save();

        if($result)
        {
            return "Verified";
        }
        else
        {
            return "Not Verified";
        }
    }
    public function gen_verify_code()
    {
        $verifucation_code = random_int(100000, 999999);
        return $verifucation_code;
    }
}
