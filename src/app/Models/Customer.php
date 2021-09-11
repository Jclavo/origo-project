<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Subscription;
use App\Models\CustomerSubscription;

class Customer extends Model
{
    
    protected $with = ['subscriptions'];

    const BANNED_STATE = "São Paulo";
    const BANNED_SUBSCRIPTION = "Free";

    /**
     * its subscriptions
     */
    public function subscriptions()
    {
        return $this->belongsToMany(Subscription::class)
                    ->using(CustomerSubscription::class);
    }

    // static function getBannedStates(){
    //     return ['São Paulo'];
    // }

    // static function getBannedSubscriptions(){
    //     return ['Free'];
    // }
}
