<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Finance\BankRequest;
use App\Http\Requests\Finance\BudgetRequest;
use App\Models\Finance\Asset;
use App\Models\Finance\Expense;
use App\Models\Finance\Liability;
use App\Models\Finance\Bank;

class FinanceBudgetingController extends Controller
{
    public function index_connectedbanks($id){
        $banks = Bank::where('manager_id',$id)->get();
        if($banks){
            return response()->json($banks, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }

    public function expense(BudgetRequest $req, $id){
        $expense = new Expense;
        $expense->type = $req->type;
        $expense->amount = $req->amount;
        $expense->manager_id = $id;
        $expense->save();
        $bank = Bank::where('manager_id',$id)->first();
        $update_bank = Bank::find($bank->id);
        $update_bank->balance -= $req->amount;
        $update_bank->save();
        $success = array("success"=>"Expense Added","code"=>"200");
        return response()->json($success, 200);
    }
    public function asset(BudgetRequest $req, $id){
        $asset = new Asset;
        $asset->type = $req->type;
        $asset->amount = $req->amount;
        $asset->manager_id = $id;
        $asset->save();
        $bank = Bank::where('manager_id',$id)->first();
        $update_bank = Bank::find($bank->id);
        $update_bank->balance += $req->amount;
        $update_bank->save();
        $success = array("success"=>"Asset Added","code"=>"200");
        return response()->json($success, 200);
    }
    public function liability(BudgetRequest $req, $id){
        $liability = new Liability;
        $liability->type = $req->type;
        $liability->amount = $req->amount;
        $liability->manager_id = $id;
        $liability->save();
        $bank = Bank::where('manager_id',$id)->first();
        $update_bank = Bank::find($bank->id);
        $update_bank->balance -= $req->amount;
        $update_bank->save();
        $success = array("success"=>"Liability Added","code"=>"200");
        return response()->json($success, 200);
    }

    public function newbank(BankRequest $req, $id){
        $bank = new Bank;
        $bank->name = $req->name;
        $bank->holder_name = $req->holder_name;
        $bank->balance = $req->balance;
        $bank->account_no = $req->account_no;
        $bank->manager_id = $id;
        $bank->save();
        $success = array("success"=>"Bank Added","code"=>"200");
        return response()->json($success, 200);
    }

    public function disconnect($id){
        if(Bank::destroy($id)){
            $success = array("success"=>"Bank Disconnected","code"=>"200");
            return response()->json($success, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
}
