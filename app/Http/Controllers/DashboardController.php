<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Organization;
use App\Models\Project;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $projects = Project::query()
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('status');

        $client = Client::query()
            ->orderBy('created_at', 'desc')
            ->count();

        $organization = Organization::query()
            ->orderBy('created_at', 'desc')
            ->count();

        return Inertia::render('Dashboard', [
            'projects' => $projects,
            'client' => $client,
            'organization' => $organization,
        ]);
    }
}
