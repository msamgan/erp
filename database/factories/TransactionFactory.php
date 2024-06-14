<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'amount' => $this->faker->randomFloat(2, 1000, 100000),
            'type' => $this->faker->randomElement(['incoming', 'outgoing']),
            'description' => $this->faker->sentence,
            'project_id' => Project::query()->inRandomOrder()->first()?->id,
            'date' => $this->faker->dateTimeThisYear->format('Y-m-d'),
        ];
    }
}
