<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HRuserController;
use App\Http\Controllers\HRemployeeController;
use App\Http\Controllers\HRgroupController;
use App\Http\Controllers\HRempScheduleController;
use App\Http\Controllers\HRleaveController;
use App\Http\Controllers\HRexpenseController;
use App\Http\Controllers\HRuserProfileController;
use App\Http\Controllers\HRhomeController;
use App\Http\Controllers\SigninController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//login
Route::post('/login', [SigninController::class,'verify']);
//home
Route::get('/HR/employee/ratio',[HRhomeController::class,'index']);
//User

Route::Post('/HR/user/create',[HRuserController::class,'addUser']);
Route::get('/HR/user/list',[HRuserController::class,'getUserList']);
Route::delete('/HR/user/delete/{id}',[HRuserController::class,'deleteUser']);
Route::put('/HR/user/update/{id}',[HRuserController::class,'updateUser']);
Route::get("/HR/user/{id}",[HRuserController::class,'getUserById']);
Route::get("/HR/user/search/{username}",[HRuserController::class,'searchUser']);

//Employee
Route::Post('/HR/employee/create',[HRemployeeController::class,'addEmployee']);
Route::get('/HR/employee/list',[HRemployeeController::class,'getEmployeeList']);
Route::put('/HR/employee/update/{employee_id}',[HRemployeeController::class,'updateEmployee']);
Route::delete('/HR/employee/delete/{employee_id}',[HRemployeeController::class,'deleteEmployee']);
Route::Post('/HR/employee/group',[HRgroupController::class,'createGroup']);
Route::get('/HR/employee/{employee_id}',[HRemployeeController::class,'getEmpByEmpId']);
Route::get('/HR/emp/schedule',[HRempScheduleController::class,'schedule']);
Route::get('/HR/employee/search/{employee_name}',[HRemployeeController::class,'searchEmp']);
//Leave

Route::Post('/HR/leave/request/{username}',[HRleaveController::class,'verifyLeave']);
Route::get('/HR/leave/request/list',[HRleaveController::class,'getLeaveList']);
Route::get('/HR/leave/pending/list',[HRleaveController::class,'getPendingList']);
Route::put('/HR/leave/approve/{id}',[HRleaveController::class,'VerifyApprove']);
Route::put('/HR/leave/reject/{id}',[HRleaveController::class,'VerifyReject']);
Route::get("/HR/leave/{id}",[HRleaveController::class,'getLeaveById']);
//Expense
Route::post('/HR/expense/report',[HRexpenseController::class,'create']);
Route::get('/HR/expense/list',[HRexpenseController::class,'getExpenseList']);
Route::put('/HR/expense/update/{id}',[HRexpenseController::class,'updateExpense']);
Route::delete('/HR/expense/delete/{id}',[HRexpenseController::class,'deleteExpense']);
Route::get('/HR/expense/{id}',[HRexpenseController::class,'getExpenseById']);
Route::get('/HR/amount/statistic',[HRexpenseController::class,'statistic']);
//Profile
Route::get('/HR/profile/{username}',[HRuserProfileController::class,'details']);
Route::put('/HR/profile/update/{username}',[HRuserProfileController::class,'profileUpdate']);
Route::put('/HR/change/password/{username}',[HRuserProfileController::class,'passwordUpdate']);
Route::post('/HR/upload/image/{username}',[HRuserProfileController::class,'imageUpdate']);







