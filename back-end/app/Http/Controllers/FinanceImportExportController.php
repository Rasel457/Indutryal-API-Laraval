<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Finance\ImportRequest;
use App\Models\Finance\ImportExport;
use App\Models\Finance\Asset;
use App\Models\Finance\Liability;
use App\Models\Finance\Invoice;
use App\Models\Finance\Leave;
use App\Models\Finance\Expense;
use Carbon\Carbon;
use File;
use DB;

class FinanceImportExportController extends Controller
{
    public function index_history($id){
        $import_history = ImportExport::where('employee_id',$id)->get();
        if($import_history){
            return response()->json($import_history, 200);
        }
        $error = array("error"=>"Not Found","code"=>"404");
        return response()->json($error, 404);
    }
    
    public function export($id){
        $data = [
            'finance_import_history' => DB::table('finance_import_history')->select('date','action','employee_id','file')->get()->toArray(),
            'assets' => DB::table('assets')->select('type','amount','created_at','updated_at','manager_id')->get()->toArray(),
            'liabilities' => DB::table('liabilities')->select('type','amount','created_at','updated_at','manager_id')->get()->toArray(),
            'invoices' => DB::table('invoices')->select('title','type','for_name','created_at','updated_at','status', 'sales_order_id','total_amount','manager_id')->get()->toArray(),
            'leave_request' => DB::table('leave_request')->select('request_description','type','start_time','end_time','request_made','employee_id','status')->get()->toArray(),
            'expenses' => DB::table('expenses')->select('type','amount','created_at','updated_at','manager_id')->get()->toArray(),
         ];
        $data = json_encode($data);
        $fileName = uniqid() . '_datafile.json';
        File::put(public_path('upload/Finance/Export/'.$fileName), $data);
        $import_history = new ImportExport;
        $import_history->date = Carbon::now();
        $import_history->action = 'Export';
        $import_history->employee_id = $id;
        $import_history->file = $fileName;
        $import_history->save();
        $success = array("success"=>"Finance Data Exported","code"=>"200");
        return response()->json($success, 200);
    }

    public function import(ImportRequest $req, $id){
        $import_history = new ImportExport;
        $import_history->date = Carbon::now();
        $import_history->action = 'Import';
        $import_history->employee_id = $id;
        $import_history->file = '';
        $import_history->save();
        $data = File::get($req->file('importfile'));
        $json = json_decode($data, true) ;
        foreach ($json as $table => $rows) {
            DB::table($table)->insert($rows);
        }
        $success = array("success"=>"Finance Data Imported","code"=>"200");
        return response()->json($success, 200);
    }
}
