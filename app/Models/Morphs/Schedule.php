<?php

namespace App\Models\Morphs;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'start_date', 'start_time', 'end_date', 'end_time'];


    /**
     * Get the parent commentable model (post or video).
     */
    public function scheduleable()
    {
        return $this->morphTo();
    }
}
