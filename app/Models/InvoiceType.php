<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceType extends Model
{
    /** @use HasFactory<\Database\Factories\InvoiceTypeFactory> */
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name_ar',
        'name_en',
        'is_active',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
