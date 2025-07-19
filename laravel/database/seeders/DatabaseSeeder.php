<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\PlanSeeder;
use Database\Seeders\RoleSeeder;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PlanSeeder::class,
            RoleSeeder::class
        ]);

        User::factory()->create([
            'name' => 'Nikolay',
            'email' => 'cholyo999@gmail.com',
            'password' => 12345,
            'role_id' => 1,
            'plan_id' => 1
        ]);
    }
}
