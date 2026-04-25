<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Country;
use App\Traits\UploadsToCloudinary;
use Illuminate\Foundation\Exceptions\Renderer\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CompanyController extends Controller
{

    use UploadsToCloudinary;
    //
    public function createPage()
    {
        $user      = Auth::user();
        $countries = Country::all();
        return Inertia::render("vendor/company/create", [
            "countries" => $countries,
            "user"      => $user,
        ]);
    }

    public function storeCompany(Request $request)
    {
        try {
            $user = Auth::user();
            $request->validate([
                "name"       => "required",
                "email"      => "required",
                "phone"      => "required",
                "address"    => "required",
                "city"       => "required",
                "state"      => "required",
                "zip"        => "required",
                "country_id" => "required",
                "logo"       => "required",
            ]);
            $company             = new Company();
            $company->user_id    = $user->id;
            $company->name       = $request->name;
            $company->email      = $request->email;
            $company->phone      = $request->phone;
            $company->address    = $request->address;
            $company->city       = $request->city;
            $company->state      = $request->state;
            $company->zip        = $request->zip;
            $company->country_id = $request->country_id;

            $logoPath = null;
            if ($request->hasFile('logo')) {
                $logoPath = $this->uploadToCloudinary($request->file('logo'), 'stores/logos');
            }

            $company->logo = $logoPath;
            $company->save();
            return redirect()->route("vendor.dashboard");
        } catch (Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }




    public function editPage()
    {
       
       try{
         $countries = Country::all();
         $company = Company::where('user_id', Auth::user()->id)->first();
        return Inertia::render("vendor/company/update", [
            "countries" => $countries,
            "company"   => $company,
        ]);
       }catch(Exception $e){
        return redirect()->back()->with("error", $e->getMessage());
       }
    }


    public function updateCompany(Request $request, $id)
    {
        try {

            $request->validate([
                "name"       => "required",
                "email"      => "required",
                "phone"      => "required",
                "address"    => "required",
                "city"       => "required",
                "state"      => "required",
                "zip"        => "required",
                "country_id" => "required",
               "logo" => "nullable|image",
            ]);
            $company             = Company::find($id);
            $company->name       = $request->name;
            $company->email      = $request->email;
            $company->phone      = $request->phone;
            $company->address    = $request->address;
            $company->city       = $request->city;
            $company->state      = $request->state;
            $company->zip        = $request->zip;
            $company->country_id = $request->country_id;

           

            if ($request->hasFile('logo')) {
            $company->logo = $this->uploadToCloudinary(
                $request->file('logo'),
                'stores/logos'
            );
        }


            // $company->logo = $logoPath;
            $company->save();
            return redirect()->back();
        } catch (Exception $e) {
            return redirect()->back()->with("error", $e->getMessage());
        }
    }



    

}
