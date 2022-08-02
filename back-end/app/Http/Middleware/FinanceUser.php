<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class FinanceUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if($request->header('user_type') == 'finance'){
            return $next($request);
        }
        $errors = array("error"=>"Unauthorized","code"=>"401");
        return response()->json($errors, 401);
    }
}
