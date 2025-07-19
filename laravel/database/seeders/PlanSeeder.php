<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'name' => 'premium',
            'price' => 100,
            'plan_stripe_id' => 'price_1RjEWqE304o9vwS29CXwrPKW'
        ]);

        Plan::create([
            'name' => 'advanced',
            'price' => 50,
            'plan_stripe_id' => 'price_1RjEWJE304o9vwS2CKkGZILv'
        ]);

        Plan::create([
            'name' => 'normal',
            'price' => 10,
            'plan_stripe_id' => 'price_1RjEVSE304o9vwS2TqXiVJrO'
        ]);
    }
}
