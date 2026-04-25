<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    /** @use HasFactory<\Database\Factories\CountryFactory> */
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'code',
        'currency',
        'currency_symbol',
        'flag',
        'vat',
        'is_active',
    ];

    public function companies()
    {
        return $this->hasMany(Company::class);
    }
}
