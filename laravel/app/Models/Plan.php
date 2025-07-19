<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'price',
        'plan_stripe_id'
    ];
}
