<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    //

    public function index()
    {
        try {
            return Inertia::render('vendor/account/index');
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
            
        }
    }
}
