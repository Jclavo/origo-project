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
            (object) array('name' => 'Claudianus Boast', 'email' => 'cboast0@fastcompany.com', 'phone' => '(19) 957645371', 'state' => 'São Paulo', 'city' => 'Araraquara', 'birthdate' => '1993-07-06'),
            (object) array('name' => 'Loni Jennions', 'email' => 'ljennions1@va.gov', 'phone' => '(19) 905613161', 'state' => 'São Paulo', 'city' => 'Limeira', 'birthdate' => '1985-05-09'),
            (object) array('name' => 'Margi Gilhouley', 'email' => 'mgilhouley2@telegraph.co.uk', 'phone' => '(19) 966290104', 'state' => 'São Paulo', 'city' => 'Araraquara', 'birthdate' => '1984-09-13'),
            (object) array('name' => 'Lexy Sprulls', 'email' => 'lsprulls3@moonfruit.com', 'phone' => '(19) 976121601', 'state' => 'São Paulo', 'city' => 'Rio Claro', 'birthdate' => '1999-10-19'),
            (object) array('name' => 'Marie Shatliff', 'email' => 'mshatliff4@cbslocal.com', 'phone' => '(19) 991376354', 'state' => 'São Paulo', 'city' => 'Rio Claro', 'birthdate' => '1990-07-20'),
            (object) array('name' => 'Graig Mouncey', 'email' => 'gmouncey5@so-net.ne.jp', 'phone' => '(19) 941806149', 'state' => 'São Paulo', 'city' => 'Araraquara', 'birthdate' => '1990-03-27'),
            (object) array('name' => 'Laurice Liger', 'email' => 'lliger0@php.net', 'phone' => '(35) 971740954', 'state' => 'Minas Gerais', 'city' => 'Areado', 'birthdate' => '1992-10-25'),
            (object) array('name' => 'Kendrick Sooper', 'email' => 'ksooper1@slate.com', 'phone' => '(31) 944324086', 'state' => 'Minas Gerais', 'city' => 'Belo Horizonte', 'birthdate' => '1981-06-02'),
            (object) array('name' => 'Gordon Levington', 'email' => 'glevington2@hpost.com', 'phone' => '(31) 922405868', 'state' => 'Minas Gerais', 'city' => 'Belo Horizonte', 'birthdate' => '1993-11-25'),
            (object) array('name' => 'Noam Scolland', 'email' => 'nscolland3@mozilla.org', 'phone' => '(35) 996817669', 'state' => 'Minas Gerais', 'city' => 'Areado', 'birthdate' => '1999-12-31'),
            (object) array('name' => 'Lindon Skehens', 'email' => 'lskehens4@npr.org', 'phone' => '(35) 967671104', 'state' => 'Minas Gerais', 'city' => 'Areado', 'birthdate' => '1985-01-10'),
            (object) array('name' => 'Kimbra Rase', 'email' => 'krase5@topsy.com', 'phone' => '(35) 999428030', 'state' => 'Minas Gerais', 'city' => 'Areado', 'birthdate' => '1999-05-05'),
            (object) array('name' => 'Lorenzo Fisk', 'email' => 'lfisk6@businessweek.com', 'phone' => '(31) 912695467', 'state' => 'Minas Gerais', 'city' => 'Belo Horizonte', 'birthdate' => '1985-12-22'),
            (object) array('name' => 'Bourke Flavelle', 'email' => 'bflavelle7@fc2.com', 'phone' => '(35) 959386145', 'state' => 'Minas Gerais', 'city' => 'Itapeva', 'birthdate' => '1984-04-10'),
            (object) array('name' => 'Curran McSharry', 'email' => 'cmcsharry8@webeden.co.uk', 'phone' => '(35) 902916131', 'state' => 'Minas Gerais', 'city' => 'Itapeva', 'birthdate' => '1983-01-15'),
            (object) array('name' => 'Aveline Dowtry', 'email' => 'adowtry9@miibeian.gov.cn', 'phone' => '(31) 945227500', 'state' => 'Minas Gerais', 'city' => 'Belo Horizonte', 'birthdate' => '1994-12-23'),
            (object) array('name' => 'John Sebastian', 'email' => 'jsebastiana@cbslocal.com', 'phone' => '(31) 907366740', 'state' => 'Minas Gerais', 'city' => 'Belo Horizonte', 'birthdate' => '1998-04-06'),
            (object) array('name' => 'Reynolds Greenan', 'email' => 'rgreenanb@bloomberg.com', 'phone' => '(35) 923551410', 'state' => 'Minas Gerais', 'city' => 'Itapeva', 'birthdate' => '1985-09-19'),
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
