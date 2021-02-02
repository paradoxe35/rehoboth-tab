<?php

namespace App\Models;

use App\Models\Morphs\Address;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChurchDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'phone', 'description'];

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }
}
