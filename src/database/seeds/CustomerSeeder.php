<?php

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // (object) array('name' => '', 'email' => '', 'phone' => '', 'state' => '', 'city' => '', 'birthdate' => '')
        $costumers =  [ 
            (object) array('name' => 'Claudianus Boast', 'email' => 'cboast0@fastcompany.com', 'phone' => '(19) 957645371', 'state' => 'São Paulo', 'city' => 'Araraquara', 'birthdate' => '07/06/1993'),
            (object) array('name' => 'Loni Jennions', 'email' => 'ljennions1@va.gov', 'phone' => '(19) 905613161', 'state' => 'São Paulo', 'city' => 'Limeira', 'birthdate' => '09/05/1985')
        ];

        foreach ($costumers as $costumer) {

            Customer::updateOrCreate([
                'name' => $costumer->name,
                'email' => $costumer->email,
                'phone' => $costumer->phone,
                'state' => $costumer->state,
                'city' => $costumer->city,
                'birthdate' => $costumer->birthdate
            ]);
        }









        
        
        
        
        
        
        

    }
}
