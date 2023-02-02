<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;

use Illuminate\Validation\Rule;


class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id' => 'nullable',
            'first_name' => 'required|string|max:100',
            'last_name' => 'required|string|max:100',
            'email' => ['required','string','email', Rule::unique('customers')->ignore($this->id),'max:100'],
            'user_name' => ['required','string', Rule::unique('customers')->ignore($this->id),'max:100'],
            'salary' => 'required|numeric|between:1,10000',
            'status' => 'required|in:0,1,2',
        ];
    }
}
