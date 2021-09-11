<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CustomerSubscription extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('customer_subscription', function (Blueprint $table) {

            $table->unsignedBigInteger('customer_id');
            $table->foreign('customer_id')
            ->references('id') 
            ->on('customers')
            ->onDelete('cascade');
    
    
            $table->unsignedBigInteger('subscription_id');
            $table->foreign('subscription_id')
            ->references('id') 
            ->on('subscriptions')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
