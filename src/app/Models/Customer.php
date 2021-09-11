<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Subscription;
use App\Models\CustomerSubscription;

class Customer extends Model
{
    
    protected $with = ['subscriptions'];
    /**
     * its subscriptions
     */
    public function subscriptions()
    {
        return $this->belongsToMany(Subscription::class)
                    ->using(CustomerSubscription::class);
    }
}
