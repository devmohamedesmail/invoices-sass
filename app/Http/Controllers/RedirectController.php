<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RedirectController extends Controller
{
    //
      public function index()
    {
        try {
            return Inertia::render('home');
        } catch (\Throwable $th) {
            return Inertia::render('404/index', [
                "error"   => $th->getMessage(),
                "message" => "Something went wrong",
            ]);
        }
    }

    /**
     * Redirect to dashboard based on user role
     *
     * @return \Inertia\Response
     */
    public function redirect_to_dashboard()
    {
        // dd();
       $user = Auth::user();
        try {
            switch ($user->role) {
                case 'vendor': // Vendor
                //    return Inertia::render('dashboard');
                    if ($user->company) {
                    // عنده شركة
                    return redirect()->route('vendor.dashboard');
                } else {
                   
                    return redirect()->route('companies.create.page');
                }
                    break;

                case 'user': // user
                    // return Inertia::render('index');
                    dd('user');
                    break;

                case 'admin': // admin
                    // return Inertia::render('dashboard');
                    return Inertia::render('dashboard');
                    break;

                default:
                    return redirect()->route('login');
            }
        } catch (\Throwable $th) {
            // return Inertia::render("404/index", [
            //     "error" => $th->getMessage(),
            // ]);
            return $th->getMessage();
        }
    }
}
