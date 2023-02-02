<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Repositories\CustomerRepository;
use App\Http\Requests\CustomerRequest;
use Illuminate\Http\Request;
use App\Jobs\SendWelcomeEmail;


class CustomerController extends Controller
{
    private $customerRepository;

    public function __construct(CustomerRepository $customerRepository)
    {
        $this->customerRepository = $customerRepository;
        $this->middleware('auth:api');
    }

    public function index()
    {
        $customers = $this->customerRepository->all();
        return view('customer.list')->with($customers);
    }

    public function allCustomers(Request $page)
    {
       $customers = $this->customerRepository->all();
       return response()->json(['message' => 'Success', 'data' => $customers], 200);
    }

    public function store(CustomerRequest $request)
    {
        $customer = $this->customerRepository->create($request->validated());
        if ($customer) {
            // TODO : CHECK YOU'R MAIL TRAB CREDENTIAlS CUZ IT'S REFUSED
           // dispatch(new SendWelcomeEmail($customer))->handle();
            return response()->json(['message' => 'Success', 'data' => $customer], 201);
        }
    }

    public function show(Customer $customer)
    {
        $customers = $this->customerRepository->all();
        return view('customer.add')->with($customers);
    }

    public function update(CustomerRequest $request)
    {
        $data = $request->validated();
        $updated = $this->customerRepository->update($data, $data['id']);

        if ($updated) {
            return response()->json(['message' => 'Success', 'data' => $updated], 200);
        } else {
            return response()->json(['message' => 'Error'], 500);
        }
    }


    public function destroy(Customer $customer)
    {
        $deleted = $this->customerRepository->delete($customer);
        if ($deleted) {
            return response()->json(['message' => 'Success'], 200);
        } else {
            return response()->json(['message' => 'Error'], 500);
        }
    }
}
