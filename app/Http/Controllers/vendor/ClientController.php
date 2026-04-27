<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Traits\HasCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{
    use HasCompany;

    /**
     * Display a listing of the resource.
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     * @throws \Exception
     */
    public function index(Request $request)
    {
        try {
            $company = $this->getCompany();

            $clients = Client::where('company_id', $company->id)
                ->when($request->search, function ($q) use ($request) {
                    $q->where('name', 'like', "%{$request->search}%")
                        ->orWhere('email', 'like', "%{$request->search}%")
                        ->orWhere('phone', 'like', "%{$request->search}%");
                })
                ->withCount('invoices')
                ->latest()
                ->paginate(10)
                ->withQueryString();

            return Inertia::render('vendor/clients/index', [
                'clients' => $clients,
                'filters' => $request->only('search'),
            ]);

        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Store a newly created resource.
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     * @throws \Exception
     */
    public function store(Request $request)
    {
        
        try {
            $company = $this->getCompany();

            $data = $request->validate([
                'name'    => 'required|string|max:255',
                'email'   => 'nullable|email|max:255',
                'phone'   => 'nullable|string|max:50',
                'address' => 'nullable|string|max:255',
                'city'    => 'nullable|string|max:100',
                'state'   => 'nullable|string|max:100',
                'country' => 'nullable|string|max:100',
            ]);

            $client = Client::create([
                'company_id' => $company->id,
                ...$data,
            ]);

            return redirect()->back()->with([
                'new_client' => $client,
            ])->with('flash_new_client', true);
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource.
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Client $client
     * @return \Inertia\Response
     * @throws \Exception
     */
    public function update(Request $request, Client $client)
    {
        try {
            abort_unless($client->company_id === $this->getCompany()->id, 403);

            $data = $request->validate([
                'name'    => 'required|string|max:255',
                'email'   => 'nullable|email|max:255',
                'phone'   => 'nullable|string|max:50',
                'address' => 'nullable|string|max:255',
                'city'    => 'nullable|string|max:100',
                'state'   => 'nullable|string|max:100',
                'country' => 'nullable|string|max:100',
            ]);

            $client->update($data);

            return redirect()->back();
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource.
     * @param \App\Models\Client $client
     * @return \Inertia\Response
     * @throws \Exception
     */
    public function destroy(Client $client)
    {
        try {
            abort_unless($client->company_id === $this->getCompany()->id, 403);
            $client->delete();
            return redirect()->back();
        } catch (\Exception $e) {
            return Inertia::render('vendor/errors/errors', [
                'error' => $e->getMessage(),
            ]);
        }
    }
}
