<?php

use Illuminate\Database\Seeder;
use App\Models\Subscription;

class SubscriptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Subscription::updateOrCreate([
            'name' => 'Free',
            'price' => 0.00
        ]);

        Subscription::updateOrCreate([
            'name' => 'Basic',
            'price' => 100.00
        ]);

        Subscription::updateOrCreate([
            'name' => 'Plus',
            'price' => 187.00
        ]);
    }
}
