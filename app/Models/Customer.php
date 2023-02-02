<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['first_name','last_name','user_name','email','salary','status'];

    public function sendWelcomeEmail()
    {
        Mail::send('welcome', ['user' => $this], function ($message) {
            $message->to($this->email)->subject('Welcome to our website!');
        });
    }
}
