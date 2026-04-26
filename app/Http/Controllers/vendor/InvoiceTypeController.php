<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\InvoiceType;
use Illuminate\Foundation\Exceptions\Renderer\Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceTypeController extends Controller
{
    //index
    public function index()
    {
        try {

            $company = auth()->user()->company;

            if (! $company) {
                return back()->withErrors(['company' => 'No company found']);
            }
            $invoice_types = InvoiceType::where('company_id', $company->id)->get();
            return Inertia::render('vendor/invoice-type/index', [
                'invoice_types' => $invoice_types,
            ]);

        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_ar'   => ['required', 'string', 'max:255'],
            'name_en'   => ['required', 'string', 'max:255'],
            'is_active' => ['boolean'],
        ]);

        $company = auth()->user()->company;

        if (! $company) {
            return back()->withErrors(['company' => 'No company found']);
        }

        InvoiceType::create([
            'company_id' => $company->id,
            ...$data,
        ]);

        return back()->with('success', 'Invoice Type created');
    }



    public function destroy(InvoiceType $invoiceType)
{
    abort_if($invoiceType->company_id !== auth()->user()->company?->id, 403);

    $invoiceType->delete();

    return back()->with('success', 'Deleted successfully');
}

public function update(Request $request, InvoiceType $invoiceType)
{
    abort_if($invoiceType->company_id !== auth()->user()->company?->id, 403);

    $data = $request->validate([
        'name_ar'   => ['required', 'string', 'max:255'],
        'name_en'   => ['required', 'string', 'max:255'],
        'is_active' => ['boolean'],
    ]);

    $invoiceType->update($data);

    return back()->with('success', 'Updated successfully');
}
}
