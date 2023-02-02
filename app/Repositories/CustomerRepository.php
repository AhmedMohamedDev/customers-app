<?php

namespace App\Repositories;
use App\Models\Customer;

class CustomerRepository
{
    public function all()
    {
        return Customer::all();
    }

    public function create($data)
    {
        return Customer::create($data);
    }

    public function update($data, $id)
    {
       return Customer::find($id)->update($data);
    }

    public function delete($customer)
    {
        return $customer->delete();
    }
}
