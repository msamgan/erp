<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Response;
use Inertia\ResponseFactory;
use Throwable;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('Client/Index', [
            'clients' => Client::query()
                ->with('organization')
                ->with('emails')
                ->with('phones')
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request): void
    {
        try {
            DB::beginTransaction();

            if ($request->get('organization')) {
                $organization = $this->getOrCreateOrganization($request->get('organization'));
            }

            $client = Client::create([
                'name' => ucfirst($request->get('name')),
                'organization_id' => $organization->id ?? null,
            ]);

            if ($request->get('emails')) {
                $emails = explode(',', $request->get('emails'));
                $this->storeEmails($client, $emails);
            }

            if ($request->get('phones')) {
                $phones = explode(',', $request->get('phones'));
                $this->storePhones($client, $phones);
            }

            DB::commit();

        } catch (Throwable $th) {
            DB::rollBack();
        }
    }

    private function getOrCreateOrganization($name): Organization
    {
        return Organization::firstOrCreate(['name' => ucfirst($name)]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia('Client/Create');
    }

    private function storeEmails(Client $client, array $emails): void
    {
        $emails = array_map(function ($email) {
            return ['email' => strtolower(trim($email))];
        }, $emails);

        $client->emails()->createMany($emails);
    }

    private function storePhones(Client $client, array $phones): void
    {
        $phones = array_map(function ($phone) {
            return ['phone' => trim($phone)];
        }, $phones);

        $client->phones()->createMany($phones);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client): Response|ResponseFactory
    {
        return inertia('Client/Edit', [
            'client' => $client->load('organization', 'emails', 'phones'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client): void
    {
        try {
            DB::beginTransaction();

            $client->update([
                'name' => ucfirst($request->get('name')),
            ]);

            if ($request->get('organization')) {
                $organization = $this->getOrCreateOrganization($request->get('organization'));
                $client->update(['organization_id' => $organization->id]);
            }

            if ($request->get('emails')) {
                $client->emails()->delete();
                $emails = explode(',', $request->get('emails'));
                $this->storeEmails($client, $emails);
            }

            if ($request->get('phones')) {
                $client->phones()->delete();
                $phones = explode(',', $request->get('phones'));
                $this->storePhones($client, $phones);
            }

            DB::commit();

        } catch (Throwable $th) {
            DB::rollBack();
        }
    }

    public function clientList(): Collection|array
    {
        return Client::query()
            ->with('organization')
            ->orderBy('id', 'desc')
            ->get();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
