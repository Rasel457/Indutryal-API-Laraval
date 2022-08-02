<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Finance\InvoiceRequest;
use App\Models\Finance\ImportExport;
use App\Models\Finance\Invoice;
use App\Models\Finance\SalesOrder;
use App\Models\Finance\Leave;
use App\Models\Finance\Expense;
use Carbon\Carbon;
use File;
use DB;
use PDF;

class FinanceInvoiceController extends Controller
{
    public function index_invoice_listcustomer($id){
        $invoices = Invoice::where('manager_id',$id)->where('type','Customer')->get();
        if($invoices){
            return response()->json($invoices, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
    public function index_invoice_listsupplier($id){
        $invoices = Invoice::where('manager_id',$id)->where('type','Supplier')->get();
        if($invoices){
            return response()->json($invoices, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
    public function index_invoice_newcustomer(){
        $salesorders = SalesOrder::where('status','Unadjusted')->where('type','Credit')->get();
        if($salesorders){
            return response()->json($salesorders, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
    public function index_invoice_newsupplier(){
        $salesorders = SalesOrder::where('status','Unadjusted')->where('type','Debit')->get();
        if($salesorders){
            return response()->json($salesorders, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function invoice_newcustomer(InvoiceRequest $req, $id){
        $invoice = new Invoice;
        $invoice->title = $req->title;
        $invoice->for_name = $req->name;
        $invoice->sales_order_id = $req->order;
        $invoice->status = 'Unadjusted';
        $invoice->type = 'Customer';
        $invoice->manager_id = $id;
        $invoice->file = uniqid() . '_INVOICE.pdf';
        $salesorder = SalesOrder::where('id',$req->order)->first();
        $invoice->total_amount = $salesorder->total_amount;
        $pdf = PDF::loadView('finance.invoice.details', array('for_name' => $invoice->for_name,'title' => $invoice->title,'date'=>Carbon::now(),'desc'=>$salesorder->order_description,'amount'=>$salesorder->total_amount,'type'=>$invoice->type));
        File::put(public_path('upload/Finance/Invoices/'.$invoice->file), $pdf->output());
        $invoice->save();
        $success = array("success"=>"Customer Invoice Created","code"=>"200");
        return response()->json($success, 200);
    }
    public function invoice_newsupplier(InvoiceRequest $req, $id){
        $invoice = new Invoice;
        $invoice->title = $req->title;
        $invoice->for_name = $req->name;
        $invoice->sales_order_id = $req->order;
        $invoice->status = 'Unadjusted';
        $invoice->type = 'Supplier';
        $invoice->manager_id = $id;
        $invoice->file = uniqid() . '_INVOICE.pdf';
        $salesorder = SalesOrder::where('id',$req->order)->first();
        $invoice->total_amount = $salesorder->total_amount;
        $pdf = PDF::loadView('finance.invoice.details', array('for_name' => $invoice->for_name,'title' => $invoice->title,'date'=>Carbon::now(),'desc'=>$salesorder->order_description,'amount'=>$salesorder->total_amount,'type'=>$invoice->type));
        File::put(public_path('upload/Finance/Invoices/'.$invoice->file), $pdf->output());
        $invoice->save();
        $success = array("success"=>"Supplier Invoice Created","code"=>"200");
        return response()->json($success, 200);
    }
    public function delete($id){
        if(Invoice::destroy($id)){
            $success = array("success"=>"Invoice Deleted","code"=>"200");
            return response()->json($success, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
}
