<?php
use App\Models\Client;
use App\Models\Company;
use App\Models\Invoice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::get('/vendor/dashboard', function () {
    $company = Company::where('user_id', Auth::id())->first();
    $clients = Client::where('company_id', $company->id)->count();
    $invoices = Invoice::where('company_id', $company->id)->count();
    $todayInvoices = Invoice::where('company_id', $company->id)->where('invoice_date', today())->count();
    return Inertia::render('vendor/index',[
        'clients' => $clients,
        'invoices' => $invoices,
        'todayInvoices' => $todayInvoices,
    ]);
})->name('vendor.dashboard');