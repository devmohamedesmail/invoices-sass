<?php
namespace App\Traits;

trait HasCompany
{
    protected function getCompany()
    {
        $company = auth()->user()->company;

        abort_unless($company, 403, 'No company found');

        return $company;
    }
}
