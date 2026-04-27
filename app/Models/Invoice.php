<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'client_id',
        'invoice_type_id',
        'invoice_number',
        'invoice_type',
        'payment_type',
        'invoice_date',
        'due_date',
        'car_no',
        'car_type',
        'car_model',
        'car_color',
        'car_year',
        'car_vin',
        'car_plate',
        'car_chassis',
        'car_engine',
        'car_transmission',
        'car_fuel',
        'subtotal',
        'tax',
        'total',
        'paid_amount',
        'balance',
        'notes',
        'terms',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function invoiceType()
    {
        return $this->belongsTo(InvoiceType::class);
    }

    public function services()
    {
        return $this->hasMany(InvoiceService::class);
    }
}
