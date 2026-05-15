<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyTerm extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyTermFactory> */
    use HasFactory;


    protected $fillable = [
        'company_id',
        'term',
        'index',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
}
