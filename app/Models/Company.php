<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /** @use HasFactory<\Database\Factories\CompanyFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'zip',
        'country_id',
        'country',
        'logo',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function invoiceTypes()
    {
        return $this->hasMany(InvoiceType::class);
    }
}
