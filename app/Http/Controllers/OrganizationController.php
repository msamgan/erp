<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Inertia\Response;
use Inertia\ResponseFactory;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('Organization/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrganizationRequest $request): void
    {
        Organization::create($request->only([
            'name',
            'location',
        ]));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response|ResponseFactory
    {
        return inertia('Organization/FormHolder');
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization): Organization
    {
        return $organization;
    }

    /**
     * Show the form for editing the specified resource.
     */
    /*public function edit(Organization $organization): Response|ResponseFactory
    {
        return inertia('Organization/FormHolder', [
            'organization' => $organization,
        ]);
    }*/

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrganizationRequest $request, Organization $organization): void
    {
        $organization->update($request->only([
            'name',
            'location',
        ]));
    }

    public function organizationList(): Collection
    {
        $organizations = Organization::query()->orderBy('created_at', 'desc');

        if (request()->get('search')) {
            $organizations->where('name', 'like', '%' . request()->get('search') . '%');
            $organizations->orWhere('location', 'like', '%' . request()->get('search') . '%');
        }

        return $organizations->get();
    }

    public function lastCreated(): ?Model
    {
        return Organization::query()->orderBy('created_at', 'desc')->first();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        //
    }
}
