<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    public function index()
    {
        return inertia('vendor/invoices/index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'invoice_number' => 'required',
            'invoice_type' => 'required',
            'payment_type' => 'required',
            'invoice_date' => 'required',
            'due_date' => 'required',
            'car_no' => 'required',
            'car_type' => 'required',
            'car_model' => 'required',
            'car_color' => 'required',
            'car_year' => 'required',
            'car_vin' => 'required',
            'car_plate' => 'required',
            'car_chassis' => 'required',
            'car_engine' => 'required',
            'car_transmission' => 'required',
            'car_fuel' => 'required',
            'subtotal' => 'required',
            'tax' => 'required',
            'total' => 'required',
            'paid_amount' => 'required',
            'balance' => 'required',
            'notes' => 'required',
            'terms' => 'required',
        ]);

        $invoice = Invoice::create($request->all());

        return redirect()->route('invoices.index');
    }

    public function update(Request $request, Invoice $invoice)
    {
        $request->validate([
            'invoice_number' => 'required',
            'invoice_type' => 'required',
            'payment_type' => 'required',
            'invoice_date' => 'required',
            'due_date' => 'required',
            'car_no' => 'required',
            'car_type' => 'required',
            'car_model' => 'required',
            'car_color' => 'required',
            'car_year' => 'required',
            'car_vin' => 'required',
            'car_plate' => 'required',
            'car_chassis' => 'required',
            'car_engine' => 'required',
            'car_transmission' => 'required',
            'car_fuel' => 'required',
            'subtotal' => 'required',
            'tax' => 'required',
            'total' => 'required',
            'paid_amount' => 'required',
            'balance' => 'required',
            'notes' => 'required',
            'terms' => 'required',
        ]);

        $invoice->update($request->all());

        return redirect()->route('invoices.index');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()->route('invoices.index');
    }
}
