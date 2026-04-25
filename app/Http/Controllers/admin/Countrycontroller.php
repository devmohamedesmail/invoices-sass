<?php
namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Country;
use Illuminate\Http\Request;

class Countrycontroller extends Controller
{
    //
    public function index()
    {
        try {
            $countries = Country::all();
            return inertia('admin/countries/index', [
                'countries' => $countries,
            ]);
        } catch (\Throwable $e) {
            return inertia('admin/errors/error', [
                'error' => $e,
            ]);
        }
    }

    // ➕ Store
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'name_ar'         => 'required|string',
            'name_en'         => 'required|string',
            'code'            => 'required|string',
            'currency'        => 'required|string',
            'currency_symbol' => 'required|string',
            'flag'            => 'nullable|string',
            'vat'             => 'nullable|string',
            'is_active'       => 'boolean',
        ]);

        $data['is_active'] = $request->boolean('is_active');

        Country::create($data);

        return back()->with('success', 'Country created successfully');
    }

    // ✏️ Update
    public function update(Request $request, Country $country)
    {
        $data = $request->validate([
            'name_ar'         => 'required|string',
            'name_en'         => 'required|string',
            'code'            => 'required|string',
            'currency'        => 'required|string',
            'currency_symbol' => 'required|string',
            'flag'            => 'nullable|string',
            'vat'             => 'nullable|string',
            'is_active'       => 'boolean',
        ]);

        $data['is_active'] = $request->boolean('is_active');

        $country->update($data);

        return back()->with('success', 'Country updated successfully');
    }

    // 🗑️ Delete
    public function destroy(Country $country)
    {
        $country->delete();

        return back()->with('success', 'Country deleted successfully');
    }
}
