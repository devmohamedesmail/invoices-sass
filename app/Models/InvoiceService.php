<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceService extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceServiceFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'invoice_id',
        'name',
        'description',
        'unit_price',
        'quantity',
        'total_price',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
