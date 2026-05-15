<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\CompanyTerm;
use App\Traits\HasCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TermsController extends Controller
{
    use HasCompany;
    //
    public function index()
    {
        try {
            $company = $this->getCompany();
            $terms   = CompanyTerm::where('company_id', $company->id)->get();
            return Inertia::render('vendor/terms/index', [
                'terms' => $terms,
            ]);
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'term'  => 'required|string|max:255',
                'index' => 'nullable',
            ]);

            CompanyTerm::create([
                'company_id' => $this->getCompany()->id,
                'term'       => $validated['term'],
                'index'      => $validated['index'],
            ]);

            return redirect()->back();
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, CompanyTerm $term)
    {

        try {
            $validated = $request->validate([
                'term'  => 'required|string|max:255',
                'index' => 'nullable',
            ]);

            $term->update([
                'term'  => $validated['term'],
                'index' => $validated['index'],
            ]);

            return redirect()->back();
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function destroy(CompanyTerm $term)
    {

        try {
            $term->delete();
            return redirect()->back();
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
