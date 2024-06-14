<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'document_url' => $this->faker->url,
            'status' => $this->faker->randomElement(['active', 'lead', 'completed', 'cancelled']),
            'start_date' => $this->faker->dateTimeThisYear,
            'end_date' => $this->faker->dateTimeThisYear,
            'costing' => $this->faker->randomFloat(2, 1000, 100000),
            'type' => $this->faker->randomElement(['singular', 'recurring']),
        ];
    }
}
