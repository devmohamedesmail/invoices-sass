<?php

namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Invoice;
use App\Models\InvoiceService;
use App\Models\InvoiceType;
use App\Traits\HasCompany;
use Illuminate\Foundation\Exceptions\Renderer\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    use HasCompany;


    public function index(Request $request)
    {
        try{
        $company = $this->getCompany();
        $invoices = Invoice::with(['client', 'invoiceType' , 'services', 'company'])
            ->where('company_id', $company->id)
            ->when($request->search, function ($q, $search) {
                $q->where(function ($inner) use ($search) {
                    $inner->where('invoice_number', 'like', "%{$search}%")
                          ->orWhereHas('client', fn($c) => $c->where('name', 'like', "%{$search}%"));
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('vendor/invoices/index', [
            'invoices' => $invoices,
            'filters'  => $request->only('search'),
        ]);
        }catch(Exception $e){
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /* ─────────────────────────────── CREATE ───────────────────────────── */

    public function create()
    {
        $company = $this->getCompany();

        $count = Invoice::where('company_id', $company->id)->count();
        $nextNumber = 'INV-' . str_pad($count + 1, 4, '0', STR_PAD_LEFT);

        return inertia('vendor/invoices/create', [
            'clients'      => Client::where('company_id', $company->id)->get(['id', 'name', 'email', 'phone']),
            'invoice_types' => InvoiceType::where('company_id', $company->id)->where('is_active', true)->get(['id', 'name_ar', 'name_en']),
            'next_invoice_number' => $nextNumber,
        ]);
    }

    /* ─────────────────────────────── STORE ─────────────────────────────── */

    public function store(Request $request)
    {
        $company = $this->getCompany();

        $validated = $request->validate([
            'client_id'        => 'required|exists:clients,id',
            'invoice_type_id'  => 'required|exists:invoice_types,id',
            'invoice_number'   => 'required|string|max:100',
            'payment_type'     => 'required|string|max:100',
            'invoice_date'     => 'required|date',
            'due_date'         => 'required|date',
            'car_no'           => 'nullable|string|max:50',
            'car_type'         => 'nullable|string|max:100',
            'car_model'        => 'nullable|string|max:100',
            'car_color'        => 'nullable|string|max:50',
            'car_year'         => 'nullable|string|max:4',
            'car_vin'          => 'nullable|string|max:50',
            'car_plate'        => 'nullable|string|max:50',
            'car_chassis'      => 'nullable|string|max:100',
            'car_engine'       => 'nullable|string|max:100',
            'car_transmission' => 'nullable|string|max:100',
            'car_fuel'         => 'nullable|string|max:50',
            'tax'              => 'required|numeric|min:0',
            'paid_amount'      => 'required|numeric|min:0',
            'notes'            => 'nullable|string',
            'terms'            => 'nullable|string',
            'services'         => 'required|array|min:1',
            'services.*.name'       => 'required|string|max:255',
            'services.*.description'=> 'nullable|string',
            'services.*.unit_price' => 'required|numeric|min:0',
            'services.*.quantity'   => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated, $company) {
            $subtotal = collect($validated['services'])
                ->sum(fn($s) => $s['unit_price'] * $s['quantity']);

            $tax   = $validated['tax'];
            $total = $subtotal + ($subtotal * $tax / 100);

            $invoice = Invoice::create([
                'company_id'       => $company->id,
                'client_id'        => $validated['client_id'],
                'invoice_type_id'  => $validated['invoice_type_id'],
                'invoice_number'   => $validated['invoice_number'],
                'payment_type'     => $validated['payment_type'],
                'invoice_date'     => $validated['invoice_date'],
                'due_date'         => $validated['due_date'],
                'car_no'           => $validated['car_no'] ?? null,
                'car_type'         => $validated['car_type'] ?? null,
                'car_model'        => $validated['car_model'] ?? null,
                'car_color'        => $validated['car_color'] ?? null,
                'car_year'         => $validated['car_year'] ?? null,
                'car_vin'          => $validated['car_vin'] ?? null,
                'car_plate'        => $validated['car_plate'] ?? null,
                'car_chassis'      => $validated['car_chassis'] ?? null,
                'car_engine'       => $validated['car_engine'] ?? null,
                'car_transmission' => $validated['car_transmission'] ?? null,
                'car_fuel'         => $validated['car_fuel'] ?? null,
                'subtotal'         => $subtotal,
                'tax'              => $tax,
                'total'            => $total,
                'paid_amount'      => $validated['paid_amount'],
                'balance'          => $total - $validated['paid_amount'],
                'notes'            => $validated['notes'] ?? null,
                'terms'            => $validated['terms'] ?? null,
            ]);

            foreach ($validated['services'] as $svc) {
                InvoiceService::create([
                    'company_id'  => $company->id,
                    'invoice_id'  => $invoice->id,
                    'name'        => $svc['name'],
                    'description' => $svc['description'] ?? null,
                    'unit_price'  => $svc['unit_price'],
                    'quantity'    => $svc['quantity'],
                    'total_price' => $svc['unit_price'] * $svc['quantity'],
                ]);
            }
        });

        return redirect()->route('invoices.index')->with('success', 'Invoice created successfully.');
    }

    /* ─────────────────────────────── UPDATE ────────────────────────────── */

    public function update(Request $request, Invoice $invoice)
    {
        $company = $this->getCompany();
        abort_unless($invoice->company_id === $company->id, 403);

        $validated = $request->validate([
            'client_id'        => 'required|exists:clients,id',
            'invoice_type_id'  => 'required|exists:invoice_types,id',
            'invoice_number'   => 'required|string|max:100',
            'payment_type'     => 'required|string|max:100',
            'invoice_date'     => 'required|date',
            'due_date'         => 'required|date',
            'car_no'           => 'nullable|string|max:50',
            'car_type'         => 'nullable|string|max:100',
            'car_model'        => 'nullable|string|max:100',
            'car_color'        => 'nullable|string|max:50',
            'car_year'         => 'nullable|string|max:4',
            'car_vin'          => 'nullable|string|max:50',
            'car_plate'        => 'nullable|string|max:50',
            'car_chassis'      => 'nullable|string|max:100',
            'car_engine'       => 'nullable|string|max:100',
            'car_transmission' => 'nullable|string|max:100',
            'car_fuel'         => 'nullable|string|max:50',
            'tax'              => 'required|numeric|min:0',
            'paid_amount'      => 'required|numeric|min:0',
            'notes'            => 'nullable|string',
            'terms'            => 'nullable|string',
            'services'         => 'required|array|min:1',
            'services.*.name'        => 'required|string|max:255',
            'services.*.description' => 'nullable|string',
            'services.*.unit_price'  => 'required|numeric|min:0',
            'services.*.quantity'    => 'required|integer|min:1',
        ]);

        DB::transaction(function () use ($validated, $invoice) {
            $subtotal = collect($validated['services'])
                ->sum(fn($s) => $s['unit_price'] * $s['quantity']);

            $tax   = $validated['tax'];
            $total = $subtotal + ($subtotal * $tax / 100);

            $invoice->update([
                'client_id'        => $validated['client_id'],
                'invoice_type_id'  => $validated['invoice_type_id'],
                'invoice_number'   => $validated['invoice_number'],
                'payment_type'     => $validated['payment_type'],
                'invoice_date'     => $validated['invoice_date'],
                'due_date'         => $validated['due_date'],
                'car_no'           => $validated['car_no'] ?? null,
                'car_type'         => $validated['car_type'] ?? null,
                'car_model'        => $validated['car_model'] ?? null,
                'car_color'        => $validated['car_color'] ?? null,
                'car_year'         => $validated['car_year'] ?? null,
                'car_vin'          => $validated['car_vin'] ?? null,
                'car_plate'        => $validated['car_plate'] ?? null,
                'car_chassis'      => $validated['car_chassis'] ?? null,
                'car_engine'       => $validated['car_engine'] ?? null,
                'car_transmission' => $validated['car_transmission'] ?? null,
                'car_fuel'         => $validated['car_fuel'] ?? null,
                'subtotal'         => $subtotal,
                'tax'              => $tax,
                'total'            => $total,
                'paid_amount'      => $validated['paid_amount'],
                'balance'          => $total - $validated['paid_amount'],
                'notes'            => $validated['notes'] ?? null,
                'terms'            => $validated['terms'] ?? null,
            ]);

            $invoice->services()->delete();

            foreach ($validated['services'] as $svc) {
                InvoiceService::create([
                    'company_id'  => $invoice->company_id,
                    'invoice_id'  => $invoice->id,
                    'name'        => $svc['name'],
                    'description' => $svc['description'] ?? null,
                    'unit_price'  => $svc['unit_price'],
                    'quantity'    => $svc['quantity'],
                    'total_price' => $svc['unit_price'] * $svc['quantity'],
                ]);
            }
        });

        return redirect()->route('invoices.index')->with('success', 'Invoice updated successfully.');
    }

    /* ─────────────────────────────── DESTROY ───────────────────────────── */

    public function destroy(Invoice $invoice)
    {
        $company = $this->getCompany();
        abort_unless($invoice->company_id === $company->id, 403);

        $invoice->services()->delete();
        $invoice->delete();

        return redirect()->route('invoices.index')->with('success', 'Invoice deleted successfully.');
    }


    public function show(Invoice $invoice)
    {
        try{
            $company = $this->getCompany();
            abort_unless($invoice->company_id === $company->id, 403);
            $invoice->load([
                'client',
                'services',
                'company',
                'invoiceType'
            ]);
            return Inertia::render('vendor/invoices/show', [
                'invoice' => $invoice,
            ]);
        }catch(Exception $e){
            return Inertia::render('vendor/errors/error', [
                'error' => $e->getMessage(),
            ]);
        }
    }
    /**
     * Show invoice preview
     * @param Invoice $invoice
     * @return Inertia
     * @author Olayemi
     * @return mixed
     */
    public function show_preview(Invoice $invoice)
    {
        try{
            $company = $this->getCompany();
            abort_unless($invoice->company_id === $company->id, 403);
            $invoice->load([
                'client',
                'services',
                'company',
                'invoiceType'
            ]);
            return Inertia::render('vendor/invoices/show-preview', [
                'invoice' => $invoice,
            ]);
        }catch(Exception $e){
            return Inertia::render('vendor/errors/error', [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
