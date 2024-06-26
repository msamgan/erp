<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\Project;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Transaction/Index');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request): void
    {
        $request = $this->mergeProjectId($request);
        $request->merge(['description' => ucfirst($request->get('description'))]);

        Transaction::create(
            $request->only('project_id', 'type', 'amount', 'description', 'date')
        );
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

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Transaction/Create');
    }

    public function descriptions(): Collection
    {
        return Transaction::query()
            ->select('description')
            ->distinct()
            ->get()
            ->pluck('description');
    }

    public function transactionListPaginated(): LengthAwarePaginator
    {
        $pageSize = request()->get('page-size') ?? PAGE_SIZE_LARGE;

        $transactions = Transaction::query()
            ->with('project')
            ->orderBy('created_at', 'desc');

        if (request()->get('search')) {
            $transactions->where('description', 'like', '%' . request()->get('search') . '%');
        }

        if (request()->get('startDate') && request()->get('endDate')) {
            $transactions->whereBetween('date', [
                request()->get('startDate'),
                Carbon::parse(request()->get('endDate'))->addDay(),
            ]);
        }

        if (request()->get('type') && request()->get('type') !== 'all') {
            $transactions->where('type', request()->get('type'));
        }

        return $transactions->paginate($pageSize);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
