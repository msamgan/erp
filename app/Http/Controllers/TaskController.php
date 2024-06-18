<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $todayTask = Task::query()
            ->whereDate('due_date', '<=', now())
            ->with('project')
            ->get();

        $tomorrowTask = Task::query()
            ->whereDate('due_date', now()->addDay())
            ->with('project')
            ->get();

        $restTasks = Task::query()
            ->where('due_date', '>=', (now()->addDay(2))->toDateString())
            ->with('project')
            ->get();

        return Inertia::render('Task/Index', [
            'todayTask' => $todayTask,
            'tomorrowTask' => $tomorrowTask,
            'restTasks' => $restTasks,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): void
    {
        $request = $this->mergeProjectId($request);

        Task::create($request->only(
            'name',
            'description',
            'due_date',
            'project_id'
        ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Task/FormHolder');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task): Response
    {
        return Inertia::render('Task/FormHolder', [
            'task' => $task->load('project'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): void
    {
        $request = $this->mergeProjectId($request);

        $task->update($request->only(
            'name',
            'description',
            'due_date',
            'project_id'
        ));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): void
    {
        //
    }

    private function mergeProjectId($request)
    {
        if ($request->get('project')) {
            $project = $this->getProjectByName($request->get('project'));
            $project
                ? $request->merge(['project_id' => $project->id])
                : $request->merge(['project_id' => null]);
        } else {
            $request->merge(['project_id' => null]);
        }

        return $request;
    }

    private function getProjectByName($project): ?Model
    {
        return Project::query()
            ->where('name', $project)
            ->first();
    }
}
