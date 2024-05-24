<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Models\Organization;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Response;
use Inertia\ResponseFactory;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response|ResponseFactory
    {
        return inertia('Organization/Index', [
            'organizations' => Organization::query()->orderBy('created_at', 'desc')->get(),
        ]);
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
        return inertia('Organization/Create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Organization $organization): Response|ResponseFactory
    {
        return inertia('Organization/Edit', [
            'organization' => $organization,
        ]);
    }

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
        return Organization::all();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Organization $organization)
    {
        //
    }
}
