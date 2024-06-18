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
        $randBool = $this->faker->boolean;

        return [
            'amount' => $this->faker->randomFloat(2, 1000, 10000),
            'type' => $this->faker->randomElement(['incoming', 'outgoing']),
            'description' => $this->faker->sentence(3),
            'project_id' => $randBool
                ? Project::query()->inRandomOrder()->whereIn('status', [
                    'active',
                    'completed',
                ])->first()->id
                : null,
            'date' => $this->faker->dateTimeThisYear->format('Y-m-d'),
        ];
    }
}
