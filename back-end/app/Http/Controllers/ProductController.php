<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Product\product_table;
use App\Models\Product\warehouse_table;
use App\Models\Product\activities_table;

class ProductController extends Controller
{
    public function addProduct(Request $req)
    {
        //check warehoue availability
        $warehouseDetails = warehouse_table::where("name",$req->warehouse_name)->first();
        $warehouseStock = $warehouseDetails->remaining_quantity;
        if($warehouseStock < $req->stock)
        {
            return "Stock not available!";
        }

        $img = $req->file('product_image');

        $product = new product_table;

        $product->product_id = $req->product_id;
        $product->product_name = $req->product_name;
        $product->status_sell = $req->status_sell;
        $product->status_purchase = $req->status_purchase;
        $product->product_description = $req->product_description;
        $product->warehouse_name = $req->warehouse_name;
        $product->stock = $req->stock;
        $product->nature = $req->nature;
        $product->weight = $req->weight;
        $product->weight_unit = $req->weight_unit;
        $product->dimention = $req->dimention;
        $product->dimention_unit = $req->dimention_unit;
        $product->selling_price = $req->selling_price;
        $product->tax = $req->tax;
        $product->image = $req->product_id.'.'.$img->getClientOriginalExtension();
        $product->product_condition = "Good";
        $product->date_added = date('Y-m-d');
        $product->last_updated = date('Y-m-d');
        $result1 = $product->save();
        $img->move('upload/Product', $req->product_id.'.'.$img->getClientOriginalExtension());

        // activity
        $activity = new activities_table;
        $activity->type = "Create Product";
        $activity->description = "Product Id: ".$req->product_id.", "."Product Name: ".$req->product_name;
        $activity->activity_time = date("Y-m-d H:i:s");
        $result2 = $activity->save();


        if($result1 && $result2)
        {
            return response()->json($result1);
        }
        else
        {
            return response('Failed to add product!', 400)
                  ->header('Content-Type', 'text/plain');
        } 
        
    }

    public function getProducts()
    {
        $allProducts = product_table::where("product_condition","Good")->get();
        return response()->json($allProducts);
    }

    public function deleteProduct($id)
    {
        $deletedProduct = product_table::find($id);
        $img_path = "upload/Product/".$deletedProduct['image'];

        if(File::exists($img_path)) 
        {
            File::delete($img_path);
        }
        $result1 = $deletedProduct->delete();

        // activity
        $activity = new activities_table;
        $activity->type = "Delete Product";
        $activity->description = "Id: ".$id."\r\n"."Product Name: ".$deletedProduct->product_name;
        $activity->activity_time = date("Y-m-d H:i:s");
        $result2 = $activity->save();

        if($result1 && $result2)
        {
            return response()->json($result1);
        }
        else
        {
            return response('Failed to delete product!', 404)
                  ->header('Content-Type', 'text/plain');
        } 
    }

    function getProductById($id)
    {
        $result = product_table::find($id);
        if($result)
        {
            return response()->json($result);
        }
        else
        {
            return response('Product not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function updateProduct(Request $req, $id)
    {
        //check warehoue availability
        $warehouseDetails = warehouse_table::where("name",$req->warehouse_name)->first();
        $warehouseStock = $warehouseDetails->remaining_quantity;
        if($warehouseStock < $req->stock)
        {
            return "Stock not available!";
        }

        $product = product_table::find($id);
        $product->product_id = $req->product_id;
        $product->product_name = $req->product_name;
        $product->status_sell = $req->status_sell;
        $product->status_purchase = $req->status_purchase;
        $product->product_description = $req->product_description;
        $product->warehouse_name = $req->warehouse_name;
        $product->stock = $req->stock;
        $product->nature = $req->nature;
        $product->weight = $req->weight;
        $product->weight_unit = $req->weight_unit;
        $product->dimention = $req->dimention;
        $product->dimention_unit = $req->dimention_unit;
        $product->selling_price = $req->selling_price;
        $product->tax = $req->tax;
        $product->product_condition = $req->product_condition;
        $product->last_updated = date('Y-m-d');
        $result1 = $product->save();

        // activity
        $activity = new activities_table;
        $activity->type = "Update Product";
        $activity->description = "Product Id: ".$req->product_id.", "."Product Name: ".$req->product_name;
        $activity->activity_time = date("Y-m-d H:i:s");
        $result2 = $activity->save();
 
         if($result1 && $result2)
         {
             return response()->json($result1);
         }
         else
         {
             return response('Failed to update product!', 400)
                   ->header('Content-Type', 'text/plain');
         } 
    }

    function getProductByName($name)
    {
        $result = product_table::where("product_name",'like','%'.$name.'%')->get();
        if(count($result) > 0)
        {
            return response()->json($result);
        }
        else
        {
            return response('Product not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function getFaultyProducts()
    {
        $allFaultyProducts = product_table::where("product_condition","Faulty")->get();
        return response()->json($allFaultyProducts);
    }

    function getFaultyProductByName($name)
    {
        $result = product_table::where("product_name",'like','%'.$name.'%')->where("product_condition","Faulty")->get();
        if(count($result) > 0)
        {
            return response()->json($result);
        }
        else
        {
            return response('Product not found!', 204)
                  ->header('Content-Type', 'text/plain');
        }
    }

    public function getCurrentAffairs()
    {
        $products = product_table::all();
        $max_stocked_product = "";
        $max_stocked = -1;
        $most_expensive_product = "";
        $most_expensive = -1;
        $good_products_cnt = 0;
        $faulty_products_cnt = 0;
        foreach($products as $product)
        {
            if($product->stock > $max_stocked)
            {
                $max_stocked = $product->stock;
                $max_stocked_product =  $product->product_name;
            }
            if($product->selling_price > $most_expensive)
            {
                $most_expensive = $product->selling_price;
                $most_expensive_product = $product->product_name;
            }
            if($product->product_condition == "Good")
            {
                $good_products_cnt++;
            }
            if($product->product_condition == "Faulty")
            {
                $faulty_products_cnt++;
            }
        }

        $affairList = [
            $max_stocked_product,
            $most_expensive_product,
            $good_products_cnt,
            $faulty_products_cnt
        ];

        return $affairList;
    }

    public function transferProduct(Request $req)
    {
        $product_id = $req->product_id;
        $warehouse_name = $req->warehouse_name;
        $transfer_quantity = $req->transfer_quantity;

        $product = product_table::where('product_id', $product_id)->get();
        $warehouseQuantity = warehouse_table::where('name', $warehouse_name)->value('quantity');
        $productQuantity = product_table::where('product_id', $product_id)->value('stock');

        if(count($product) == 0) return "Product not found";
        elseif($transfer_quantity > $warehouseQuantity)
        {
            return "Requested quantity is bigger than warehouse quantity";
        }
        else if($transfer_quantity > $productQuantity)
        {
            return "You don't have that much product!";
        }
        elseif($warehouse_name == $product[0]->warehouse_name)
        {
            return "You selected the current warehouse!";
        }
        else
        {
            // Decrease current product stock from current warehouse
            $product = product_table::where('product_id', $product_id)->first();
            $prev_warehouse_name = $product->warehouse_name;
            $prev_warehouse_quantity = $product->stock - doubleval($transfer_quantity);
            $product->stock = $product->stock - doubleval($transfer_quantity);
            $product->save();

            //Add transfer quantity to as a new product
            $newProduct = new product_table;
            $newProduct->product_id = $product->product_id;
            $newProduct->product_name = $product->product_name;
            $newProduct->status_sell = $product->status_sell;
            $newProduct->status_purchase = $product->status_purchase;
            $newProduct->product_description = $product->product_description;
            $newProduct->warehouse_name = $warehouse_name;
            $newProduct->stock = doubleval($transfer_quantity);
            $newProduct->nature = $product->nature;
            $newProduct->weight = $product->weight;
            $newProduct->weight_unit = $product->weight_unit ;
            $newProduct->dimention = $product->dimention;
            $newProduct->dimention_unit = $product->dimention_unit;
            $newProduct->selling_price = $product->selling_price;
            $newProduct->tax = $product->tax;
            $newProduct->image = $product->image;
            $newProduct->product_condition = "Good";
            $newProduct->date_added = date("Y-m-d");
            $newProduct->last_updated = date("Y-m-d");
            $newProduct->save();

            // Increase previous warehouse quantity
            $prev_warehouse = warehouse_table::where('name', $prev_warehouse_name)->first();
            $prev_warehouse->remaining_quantity += $transfer_quantity;
            $prev_warehouse->save();

            // Decrease new warehouse quantity
            $new_warehouse = warehouse_table::where('name', $warehouse_name)->first();
            $new_warehouse->remaining_quantity -= $transfer_quantity;
            $new_warehouse->save();

            // activity
            $activity = new activities_table;
            $activity->type = "Transfer Product";
            $activity->description = "Product Id: ".$product->product_id.", "."Product Name: ".$product->product_name.", "."From Warehouse: ".$product->warehouse_name.", "."To Warehouse: ".$req->warehouse_name.", "."Quantity: ".$req->transfer_quantity;
            $activity->activity_time = date("Y-m-d H:i:s");
            $activity->save();

            return "Transfer Successful";
        }
    }

    public function piChartProduct()
    {
        // Product chart
        $products = product_table::all();
        $allProducts = array(); // all types of products
        foreach($products as $item)
        {
            $currProduct = $item->product_name;
            $check = FALSE; 
            foreach($allProducts as $product)
            {
                if($product == $currProduct)
                {
                    $check = TRUE;
                    break;
                }
            }
            if(!$check)
            {
                array_push($allProducts,$currProduct);  
            }
        }

        $productCnt = []; // product wise stock
        foreach($allProducts as $currProduct)
        {
            $cnt = 0;
            foreach($products as $item)
            {
                if($item->product_name == $currProduct)
                {
                    $cnt += $item->stock;
                }
            }
            $productCnt += [$currProduct => $cnt];
        }

        return response()->json($productCnt);
    }

    public function barChartProduct()
    {
        // Column Chart, Product - Price
        // Product chart
        $products = product_table::all();
        $allProducts = array(); // all types of products
        foreach($products as $item)
        {
            $currProduct = $item->product_name;
            $check = FALSE; 
            foreach($allProducts as $product)
            {
                if($product == $currProduct)
                {
                    $check = TRUE;
                    break;
                }
            }
            if(!$check)
            {
                array_push($allProducts,$currProduct);  
            }
        }
        $productPrice = []; // product wise price
        foreach($allProducts as $currProduct)
        {
            $cnt = 0;
            foreach($products as $item)
            {
                if($item->product_name == $currProduct)
                {
                    $cnt += $item->selling_price;
                }
            }
            $productPrice += [$currProduct => $cnt];
        }
        asort($productPrice);
        return response()->json($productPrice);
    }

    public function getProductNames()
    {
        $allProducts = product_table::all();
        $allProductNames = array();
        foreach($allProducts as $currProduct)
        {
            array_push($allProductNames,$currProduct->product_name);
        }

        return response()->json($allProductNames);
    }

    
}
