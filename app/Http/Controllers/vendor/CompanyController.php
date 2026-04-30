<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Country;
use App\Traits\UploadsToCloudinary;
use Illuminate\Foundation\Exceptions\Renderer\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;

class CompanyController extends Controller
{

    use UploadsToCloudinary;

    public function index()
    {
        try {
            $user    = Auth::user();
            $company = $user->company;

            if (! $company) {
                return redirect()->route('companies.create.page');
            }

            return Inertia::render('vendor/company/update', [
                'company'   => $company,
                'countries' => \App\Models\Country::all(),
            ]);
        } catch (Exception $e) {
            return Inertia::render("vendor/errors/errors", [
                "message" => $e->getMessage(),
            ]);
        }
    }

    //
    public function createPage()
    {
        try {
            $user      = Auth::user();
            $countries = Country::all();
            return Inertia::render("vendor/company/create", [
                "countries" => $countries,
                "user"      => $user,
            ]);
        } catch (Exception $e) {
            return Inertia::render("vendor/errors/errors", [
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function storeCompany(Request $request)
    {
        try {
            $user = Auth::user();

            $company                      = new Company();
            $company->user_id             = $user->id;
            $company->name                = $request->name;
            $company->email               = $request->email;
            $company->phone               = $request->phone;
            $company->address             = $request->address;
            $company->city                = $request->city;
            $company->state               = $request->state;
            $company->zip                 = $request->zip;
            $company->country_id          = $request->country_id;
            $company->vat_number          = $request->vat_number;
            $company->registration_number = $request->registration_number;
            $company->tax                 = $request->tax;

            $baseSlug = Str::slug($request->name);
            $slug     = $baseSlug;
            $count    = 1;

            while (Company::where('slug', $slug)->exists()) {
                $slug = $baseSlug . '-' . $count;
                $count++;
            }

            $company->slug = $slug;

            $logoPath = null;
            if ($request->hasFile('logo')) {
                $logoPath = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
            }

            $company->logo = $logoPath;
            $company->save();
            return redirect()->route("vendor.dashboard");
        } catch (Exception $e) {
            return Inertia::render("vendor/errors/errors", [
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function editPage()
    {

        try {
            $countries = Country::all();
            $company   = Company::where('user_id', Auth::user()->id)->first();
            return Inertia::render("vendor/company/update", [
                "countries" => $countries,
                "company"   => $company,
            ]);
        } catch (Exception $e) {
            return Inertia::render("vendor/errors/errors", [
                "message" => $e->getMessage(),
            ]);
        }
    }

    public function updateCompany(Request $request, $id)
    {
        try {

            $company             = Company::find($id);
            $company->name       = $request->name;
            $company->email      = $request->email;
            $company->phone      = $request->phone;
            $company->address    = $request->address;
            $company->city       = $request->city;
            $company->state      = $request->state;
            $company->zip        = $request->zip;
            $company->country_id = $request->country_id;

            $company->vat_number          = $request->vat_number;
            $company->registration_number = $request->registration_number;
            $company->tax                 = $request->tax;

            if ($request->hasFile('logo')) {
                $company->logo = $this->uploadToCloudinary(
                    $request->file('logo'),
                    'stores/logos'
                );
            }

            $company->save();
            return redirect()->back();
        } catch (Exception $e) {
            return Inertia::render("vendor/errors/errors", [
                "message" => $e->getMessage(),
            ]);
        }
    }

}
