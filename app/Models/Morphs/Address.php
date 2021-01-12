<?php

namespace App\Models\Morphs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['venue', 'address', 'city', 'state', 'country', 'map', 'longitude', 'latitude'];

    /**
     * Get the parent imageable model (user or post).
     */
    public function addressable()
    {
        return $this->morphTo();
    }
}
