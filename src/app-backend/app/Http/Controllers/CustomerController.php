<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule; 

class CustomerController extends ResponseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::all();
        
        return $this->sendResponse($customers->toArray(), 'Customers gotten.');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required','max:45'],
            'email' => ['required','email','max:45','unique:customers'], 
            'phone' => ['regex:/^\(\d{2}\) \d{9}$/'], 
            'state' => ['required','max:45'], 
            'city' => ['required','max:45'], 
            'birthdate' => ['required', 'date','before:today'],
            'subscriptions' => 'nullable|array',
            'subscriptions.*' => 'nullable|exists:subscriptions,id',
        ]);
        
        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }

        $customer = new Customer();
        
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->state = $request->state;
        $customer->city = $request->city;
        $customer->birthdate = $request->birthdate;

        $customer->save();

        //add subscriptions
        $customer->subscriptions()->sync($request->subscriptions ?? []);

        return $this->sendResponse($customer->toArray(), 'Customer created');  
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(int $id)
    {
        $customer = Customer::find($id);

        if(is_null($customer)){
            return $this->sendError('Customer not found');
        }else{
            return $this->sendResponse($customer->toArray(), 'Customer gotten');  
        }
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(int $id, Request $request)
    {
        //validate if customer exist
        $customer = Customer::find($id);

        if(is_null($customer)){
            return $this->sendError('Customer not found.');
        }

        // validate fields  
        $validator = Validator::make($request->all(), [
            'name' => ['required','max:45'],
            'email' => ['required','email','max:45',Rule::unique('customers')->ignore($id)], 
            'phone' => ['regex:/^\(\d{2}\) \d{9}$/'], 
            'state' => ['required','max:45'], 
            'city' => ['required','max:45'], 
            'birthdate' => ['required', 'date', 'before:today'],
            'subscriptions' => 'nullable|array',
            'subscriptions.*' => 'nullable|exists:subscriptions,id',
        ]);
        
        if ($validator->fails()) {
            return $this->sendError($validator->errors()->first());
        }
        
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->state = $request->state;
        $customer->city = $request->city;
        $customer->birthdate = $request->birthdate;

        $customer->save();

        //add subscriptions
        $customer->subscriptions()->sync($request->subscriptions ?? []);

        return $this->sendResponse($customer->toArray(), 'Customer updated.');  
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $customer = Customer::find($id);

        if(is_null($customer)){
            return $this->sendError('Customer not found');
        }else{

            //the states must be in a table
            if (strcasecmp(trim($customer->state),Customer::BANNED_STATE) == 0) {
                return $this->sendResponse([], "Customer could not be deleted because belongs to " . Customer::BANNED_STATE);
            }

            foreach ($customer->subscriptions as $subscription) {

                // if (in_array($subscription->name, Customer::getBannedSubscriptions())) {
                if (strcasecmp($subscription->name,Customer::BANNED_SUBSCRIPTION) == 0) {
                    return $this->sendResponse([], "Customer could not be deleted because his subscription is " . Customer::BANNED_SUBSCRIPTION);
                }
            }


            $customer->delete();

            return $this->sendResponse($customer->toArray(), "Customer deleted.");
        }

    }
}
