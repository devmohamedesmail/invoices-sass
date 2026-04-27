<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\InvoiceType;
use App\Traits\HasCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class InvoiceTypeController extends Controller
{
    use HasCompany;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $company = $this->getCompany();

            if (! $company) {
                return back()->withErrors([
                    'company' => 'No company found'
                ]);
            }

            $invoice_types = InvoiceType::where('company_id', $company->id)->get();

            return Inertia::render('vendor/invoice-type/index', [
                'invoice_types' => $invoice_types,
            ]);

        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name_ar'   => ['required', 'string', 'max:255'],
                'name_en'   => ['required', 'string', 'max:255'],
                'is_active' => ['sometimes', 'boolean'],
            ]);

            $company = $this->getCompany();

            if (! $company) {
                return back()->withErrors([
                    'company' => 'No company found'
                ]);
            }

            InvoiceType::create([
                'company_id' => $company->id,
                ...$data,
            ]);

            return redirect()->back();

        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, InvoiceType $invoiceType)
    {
        try {
            abort_if(
                $invoiceType->company_id !== $this->getCompany()?->id,
                403
            );

            $data = $request->validate([
                'name_ar'   => ['required', 'string', 'max:255'],
                'name_en'   => ['required', 'string', 'max:255'],
                'is_active' => ['sometimes', 'boolean'],
            ]);

            $invoiceType->update($data);

            return redirect()->back();

        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource.
     */
    public function destroy(InvoiceType $invoiceType)
    {
        try {
            abort_if(
                $invoiceType->company_id !== $this->getCompany()?->id,
                403
            );
            $invoiceType->delete();
            return redirect()->back();

        } catch (Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}