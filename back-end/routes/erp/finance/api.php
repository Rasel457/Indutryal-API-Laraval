<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware'=>['finance_user']], function(){
Route::get('financedashboard/{id}', ['as'=>'financedashboard.index', 'uses'=>'FinanceController@index']);

//BUDGETING
Route::post('financeexpense/{id}', ['as'=>'financebudgeting.expense', 'uses'=>'FinanceBudgetingController@expense']);
Route::post('financeasset/{id}', ['as'=>'financebudgeting.asset', 'uses'=>'FinanceBudgetingController@asset']);
Route::post('financeliability/{id}', ['as'=>'financebudgeting.liability', 'uses'=>'FinanceBudgetingController@liability']);
Route::post('financenewbank/{id}', ['as'=>'financebudgeting.newbank', 'uses'=>'FinanceBudgetingController@newbank']);
Route::get('financedeletebank/{id}', ['as'=>'financebudgeting.deletebank', 'uses'=>'FinanceBudgetingController@disconnect']); //ENTITY ID
Route::get('financebanks/{id}', ['as'=>'financebudgeting.banks', 'uses'=>'FinanceBudgetingController@index_connectedbanks']);

//INVOICE
Route::post('financenewcustomer/{id}', ['as'=>'financenewcustomer.newcustomer', 'uses'=>'FinanceInvoiceController@invoice_newcustomer']);
Route::post('financenewsupplier/{id}', ['as'=>'financenewsupplier.newsupplier', 'uses'=>'FinanceInvoiceController@invoice_newsupplier']);
Route::get('financecustomerinvoices/{id}', ['as'=>'financeinvoice.customers', 'uses'=>'FinanceInvoiceController@index_invoice_listcustomer']);
Route::get('financesupplierinvoices/{id}', ['as'=>'financeinvoice.suppliers', 'uses'=>'FinanceInvoiceController@index_invoice_listsupplier']);
Route::get('financecustomerorders/{id}', ['as'=>'financeinvoiceorders.customers', 'uses'=>'FinanceInvoiceController@index_invoice_newcustomer']);
Route::get('financesupplierorders/{id}', ['as'=>'financeinvoiceorders.suppliers', 'uses'=>'FinanceInvoiceController@index_invoice_newsupplier']);
Route::get('financedeleteinvoice/{id}', ['as'=>'financeinvoice.delete', 'uses'=>'FinanceInvoiceController@delete']); //ENTITY ID

//LEAVE REQUEST
Route::post('financenewleave/{id}', ['as'=>'financenewleave.leave', 'uses'=>'FinanceLeaveRequestController@apply']);
Route::get('financeleaves/{id}', ['as'=>'financeleaves.list', 'uses'=>'FinanceLeaveRequestController@index_list']);
Route::get('financeleavedelete/{id}', ['as'=>'financeleave.delete', 'uses'=>'FinanceLeaveRequestController@delete']);

//PAYMENT
Route::get('financepaymenthistory/{id}', ['as'=>'financepayment.history', 'uses'=>'FinancePaymentController@history']);
Route::get('financeunadjustedcinvoice/{id}', ['as'=>'financeunadjusted.customer', 'uses'=>'FinancePaymentController@customer']);
Route::get('financeunadjustedsinvoice/{id}', ['as'=>'financeunadjusted.supplier', 'uses'=>'FinancePaymentController@supplier']);
Route::get('financeadjustcustomer/{id}/{user_id}', ['as'=>'financeunadjusted.customer', 'uses'=>'FinancePaymentController@customer_adjust']); //invoice id
Route::get('financeadjustsupplier/{id}/{user_id}', ['as'=>'financeunadjusted.supplier', 'uses'=>'FinancePaymentController@supplier_adjust']); //invoice id

//REPORT
Route::get('financereportinvoices/{id}', ['as'=>'financereport.invoices', 'uses'=>'FinanceReportController@index_invoice']);
Route::get('financereportfinancials/{id}', ['as'=>'financereport.financials', 'uses'=>'FinanceReportController@index_financial']);
Route::get('financereportgenerateinvoice/{id}', ['as'=>'financereportgenerate.invoice', 'uses'=>'FinanceReportController@invoice']);
Route::get('financereportgeneratefinancial/{id}', ['as'=>'financereportgenerate.financial', 'uses'=>'FinanceReportController@financial']);

//PROFILE
Route::get('financeprofile/{id}', ['as'=>'financeprofile.get', 'uses'=>'FinanceProfileController@index']);
Route::post('financeprofile/{id}', ['as'=>'financeprofile.update', 'uses'=>'FinanceProfileController@update']);

//FINANCE DATA IMPORT/EXPORT
Route::get('financeexport/{id}', ['as'=>'financeexport.export', 'uses'=>'FinanceImportExportController@export']);
Route::get('financeexporthistory/{id}', ['as'=>'financeexporthistory.history', 'uses'=>'FinanceImportExportController@index_history']);
Route::post('financeimport/{id}', ['as'=>'financeimport.import', 'uses'=>'FinanceImportExportController@import']);
});
