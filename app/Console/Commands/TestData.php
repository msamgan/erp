<?php

namespace App\Console\Commands;

use App\Models\Client;
use App\Models\Organization;
use App\Models\Project;
use App\Models\Transaction;
use Illuminate\Console\Command;

class TestData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate test data for the application';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $organizations = Organization::factory(10)->create();

        $organizations->each(function ($organization) {
            $organization->clients()->saveMany(
                Client::factory(1)->make()
            );
        });

        $clients = Client::all();

        $clients->each(function ($client) {
            $client->projects()->saveMany(
                Project::factory(1)->make()
            );
        });

        Transaction::factory(100)->create();
    }
}
