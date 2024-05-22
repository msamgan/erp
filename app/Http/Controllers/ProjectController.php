<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Project/Index', [
            'projects' => Project::query()->with('client')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): void
    {
        $client = $this->getOrCreateClient($request->get('client'));

        $clientData = $request->only('name', 'description', 'document_url', 'status', 'start_date', 'end_date', 'costing');
        $clientData['client_id'] = $client->id;

        Project::create($clientData);
    }

    private function getOrCreateClient($client)
    {
        return Client::firstOrCreate([
            'name' => ucfirst($client)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public
    function create(): Response
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project): Response
    {
        return Inertia::render('Project/Edit', [
            'project' => $project->load('client'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project): void
    {
        $client = $this->getOrCreateClient($request->get('client'));

        $clientData = $request->only('name', 'description', 'document_url', 'status', 'start_date', 'end_date', 'costing');
        $clientData['client_id'] = $client->id;

        $project->update($clientData);
    }

    public function projectList(): Collection|array
    {
        return Project::query()->with('client')->get();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
