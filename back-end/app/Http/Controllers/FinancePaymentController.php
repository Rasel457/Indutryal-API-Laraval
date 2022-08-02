<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Finance\PaymentHistory;
use App\Models\Finance\Invoice;
use App\Models\Finance\SalesOrder;
use App\Models\Finance\Asset;
use App\Models\Finance\Expense;
use App\Models\Finance\Liability;
use App\Models\Finance\Bank;
use Carbon\Carbon;
use File;
use DB;
use PDF;

class FinancePaymentController extends Controller
{
    public function history($id){
        $payment_history = PaymentHistory::where('manager_id',$id)->get();
        if($payment_history){
            return response()->json($payment_history, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function customer($id){ //get
        $invoices = Invoice::where('manager_id',$id)->where('type','Customer')->where('status','Unadjusted')->get();
        if($invoices){
            return response()->json($invoices, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function supplier($id){ //get
        $invoices = Invoice::where('manager_id',$id)->where('type','Supplier')->where('status','Unadjusted')->get();
        if($invoices){
            return response()->json($invoices, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function customer_adjust($id, $user_id){
        $invoice = Invoice::where('id',$id)->first();
        $asset = new Asset;
        $asset->type = 'Sales';
        $asset->amount = $invoice->total_amount;
        $asset->manager_id = $user_id;
        $asset->save();
        $payment_history = new PaymentHistory;
        $payment_history->type = 'Credit';
        $payment_history->amount = $invoice->total_amount;
        $payment_history->manager_id = $user_id;
        $payment_history->save();
        $invoice = Invoice::find($id);
        $invoice->status = 'Adjusted';
        $invoice->save();
        $bank = Bank::where('manager_id',$user_id)->first();
        $update_bank = Bank::find($bank->id);
        $update_bank->balance += $payment_history->amount;
        $update_bank->save();
        $success = array("success"=>"Invoice Adjusted","code"=>"200");
        return response()->json($success, 200);
    }

    public function supplier_adjust($id, $user_id){
        $invoice = Invoice::where('id',$id)->first();
        $expense = new Expense;
        $expense->type = 'Purchases';
        $expense->amount = $invoice->total_amount;
        $expense->manager_id = $user_id;
        $expense->save();
        $payment_history = new PaymentHistory;
        $payment_history->type = 'Debit';
        $payment_history->amount = $invoice->total_amount;
        $payment_history->manager_id = $user_id;
        $payment_history->save();
        $invoice = Invoice::find($id);
        $invoice->status = 'Adjusted';
        $invoice->save();
        $liability = new Liability;
        $liability->type = 'Expenses';
        $liability->amount = $payment_history->amount;
        $liability->manager_id = $user_id;
        $liability->save();
        $bank = Bank::where('manager_id',$user_id)->first();
        $update_bank = Bank::find($bank->id);
        $update_bank->balance -= $payment_history->amount;
        $update_bank->save();
        $success = array("success"=>"Invoice Adjusted","code"=>"200");
        return response()->json($success, 200);
    }
}
