<?php

namespace App\Http\Controllers;

use App\Models\Sales\SalesOrders;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalesOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SalesOrders::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_id'=>'required',
            'order_description' => 'required',
            'total_amount'=>'required',
            'status'=>'required',
            'type'=>'required',
        ]);
        return SalesOrders::create($request->all());

        // return $request;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        $order = SalesOrders::find($id);
        return $order;        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {
        $order = SalesOrders::find($id);
        $request->validate([
            'customer_id'=>'required',
            'order_description' => 'required',
            'total_amount'=>'required',
            'status'=>'required',
            'type'=>'required',
        ]);
        $order->update([
            $order->customer_id = $request->customer_id,
            $order->order_description = $request->order_description,
            $order->total_amount = $request->total_amount,
            $order->status = $request->status,
            $order->delivered_on = $request->delivered_on,
            $order->type = $request->type,
        ]);

        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SalesOrders  $salesCustomers
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        return SalesOrders::destroy($id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SalesOrders  $salesCustomers
     * @return \Illuminate\Http\Response
     */
    public function search(string $name)
    {
        // return gettype($id);
        return SalesOrders::where('id', 'like', '%'.$name.'%')->get();
    }
}
