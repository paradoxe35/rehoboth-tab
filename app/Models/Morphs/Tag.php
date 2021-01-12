<?php

namespace App\Models\Morphs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];


    /**
     * Get the parent commentable model (post or video).
     */
    public function tagable()
    {
        return $this->morphTo();
    }
}
