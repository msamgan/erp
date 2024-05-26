<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Client;
use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;
use Inertia\Response;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $project = Project::query()->with('client')
            ->orderBy('created_at', 'desc');

        if (request()->get('status') && request()->get('status') !== 'all') {
            $project->where('status', request()->get('status'));
        }

        if (request()->get('search')) {
            $project->where('name', 'like', '%' . request()->get('search') . '%');
        }

        $project = $project->get();


        return Inertia::render('Project/Index', [
            'projects' => $project,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request): void
    {
        $client = $this->getOrCreateClient($request->get('client'));

        $clientData = $request->only('name', 'description', 'document_url', 'status', 'start_date', 'end_date', 'costing', 'type');
        $clientData['client_id'] = $client->id;

        Project::create($clientData);
    }

    private function getOrCreateClient($client)
    {
        return Client::firstOrCreate([
            'name' => ucfirst($client),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Project/Create');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project): Response
    {
        return Inertia::render('Project/Show', [
            'project' => $project->load('client', 'transactions'),
        ]);
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

        $clientData = $request->only('name', 'description', 'document_url', 'status', 'start_date', 'end_date', 'costing', 'type');
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
