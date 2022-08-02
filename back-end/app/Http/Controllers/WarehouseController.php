<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product\warehouse_table;
use App\Models\Product\activities_table;

class WarehouseController extends Controller
{
    public function addWarehouse(Request $req)
    {
        $warehouse = new warehouse_table;
        $warehouse->warehouse_id = $req->warehouse_id;
        $warehouse->name = $req->name;
        $warehouse->description = $req->description;
        $warehouse->address = $req->address;
        $warehouse->zip_code = $req->zip_code;
        $warehouse->city = $req->city;
        $warehouse->country = $req->country;
        $warehouse->phone = $req->phone;
        $warehouse->quantity = $req->quantity;
        $warehouse->remaining_quantity = $req->quantity;
        $warehouse->status = $req->status;
        $warehouse->date_added = date('Y-m-d');
        $warehouse->last_updated = date('Y-m-d');
        $result1 = $warehouse->save();

        // activity
        $activity = new activities_table;
        $activity->type = "Create Warehouse";
        $activity->description = "Warehouse Id: ".$req->warehouse_id.", "."Warehouse Name: ".$req->warehouse_name;
        $activity->activity_time = date("Y-m-d H:i:s");
        $result2 = $activity->save();

        if($result1 && $result2)
        {
            return response()->json($result1);
        }
        else
        {
            return response('Failed to add warehouse!', 400)
                  ->header('Content-Type', 'text/plain');
        } 
    }

    public function getWarehouses()
    {
        $allWarehouses = warehouse_table::all();
        return response()->json($allWarehouses);
    }

    function getWarehouseByName($name)
    {
        $result = warehouse_table::where("name",'like','%'.$name.'%')->get();
        if(count($result) > 0)
        {
            return response()->json($result);
        }
        else
        {
            return response('Warehouse not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function deleteWarehouse($id)
    {
        $deletedWarehouse = warehouse_table::find($id);
        $result = $deletedWarehouse->delete();

        // activity
        $activity = new activities_table;
        $activity->type = "Delete Warehouse";
        $activity->description = "Warehouse Id: ".$id."\r\n"."Warehouse Name: ".$deletedWarehouse->name;
        $activity->activity_time = date("Y-m-d H:i:s");
        $result2 = $activity->save();

        if($result)
        {
            return response()->json($result);
        }
        else
        {
            return response('Failed to delete warehouse!', 404)
                  ->header('Content-Type', 'text/plain');
        } 
    }

    public function updateWarehouse(Request $req, $id)
    {
        $warehouse = warehouse_table::find($id);
        $warehouse->warehouse_id = $req->warehouse_id;
        $warehouse->name = $req->name;
        $warehouse->description = $req->description;
        $warehouse->address = $req->address;
        $warehouse->zip_code = $req->zip_code;
        $warehouse->city = $req->city;
        $warehouse->country = $req->country;
        $warehouse->phone = $req->phone;
        $warehouse->quantity = $req->quantity;
        $warehouse->status = $req->status;
        $warehouse->last_updated = date('Y-m-d');
        $result1 = $warehouse->save();

        // activity
        $activity = new activities_table;
        $activity->type = "Update Warehouse";
        $activity->description = "Id: ".$id.", "."Warehouse Name: ".$req->name;
        $activity->activity_time = date("Y-m-d H:i:s");
        $result2 = $activity->save();
 
         if($result1 && $result2)
         {
             return response()->json($result1);
         }
         else
         {
             return response('Failed to update warehouse!', 400)
                   ->header('Content-Type', 'text/plain');
         } 
    }

    function getWarehouseById($id)
    {
        $result = warehouse_table::find($id);
        if($result)
        {
            return response()->json($result);
        }
        else
        {
            return response('Warehouse not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function getWarehouseNames()
    {
        $allWarehouses = warehouse_table::all();
        $allWarehouseNames = array();
        foreach($allWarehouses as $currWarehouse)
        {
            array_push($allWarehouseNames,$currWarehouse->name);
        }

        return response()->json($allWarehouseNames);
    }

    public function piChartWarehouse()
    {
        // Warehouse chart
        $warehouses = warehouse_table::all();
        $warehouseCnt = []; // warehouse wise remaining quantity
        foreach($warehouses as $item)
        {
            $currWarehouse = $item->name;
            $currWarehouseQuantity = $item->remaining_quantity;
            $warehouseCnt += [$currWarehouse => $currWarehouseQuantity];
        }

        return response()->json($warehouseCnt);
    }

    public function doughnutChartWarehouse()
    {
        // Warehouse country chart
        $warehouses = warehouse_table::all();
        $allWarehouses = array(); // all warehouse array
        foreach($warehouses as $item)
        {
            $currWarehouses = $item->name;
            $check = FALSE; 
            foreach($allWarehouses as $warehouse)
            {
                if($warehouse == $currWarehouses)
                {
                    $check = TRUE;
                    break;
                }
            }
            if(!$check)
            {
                array_push($allWarehouses,$currWarehouses);  
            }
        }

        $warehouseCountryCnt = []; // country wise warehouse count
        foreach($allWarehouses as $currWarehouses)
        {
            $cnt = 0;
            foreach($warehouses as $item)
            {
                if($item->name == $currWarehouses)
                {
                    $cnt++;
                }
            }
            $warehouseCountryCnt += [$currWarehouses => $cnt];
        }

        return response()->json($warehouseCountryCnt);
    }
}
