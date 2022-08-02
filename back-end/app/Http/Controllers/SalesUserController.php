<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sales\SalesUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SalesUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = SalesUser::find($id);
        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = SalesUser::find($id);
        $request->validate([
            'firstname'=>'required',
            'lastname'=>'required',
            'username'=>'required',
            'email'=>'required',
            'phone'=>'required',
            'position'=>'required',
            'work_hour'=>'required',
        ]);
        $user->update([
            $user->firstname = $request->firstname,
            $user->lastname = $request->lastname,
            $user->username = $request->username,
            $user->email = $request->email,
            $user->phone = $request->phone,
            $user->address = $request->address,
            $user->position = $request->position,
            $user->work_hour = $request->work_hour,
        ]);

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getPassword(Request $request)
    {
        $user = SalesUser::find($request->id);
        if($user['pass'])
        {
            if($user['pass'] == $request->pass)
            {
                return 'matched';
            }
            else
            {
                return 'unmatched';
            }
        }
        else
        {
            return 'false';
        }
    }

    public function setPassword(Request $request)
    {
        $user = SalesUser::find($request->id);
        $request->validate([
            'id'=>'required',
            'pass'=>'required',
        ]);
        $user->update([
            $user->pass = $request->pass
        ]);
        return true;
    }

    public function getImage($id)
    {
        // return "ok";
        $user = SalesUser::find($id);
        // $path = public_path().'/upload/Users/atanusaha143.jpg';
        $path = public_path().'/upload/Users/'.$user['profile_pic'];
        return Response::download($path);
        
    }
}
