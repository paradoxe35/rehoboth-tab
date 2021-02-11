<?php

namespace App\Models\Morphs;

use App\FormattableDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory, FormattableDate;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'start_date', 'start_time', 'end_date', 'end_time'];


    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'start_fdate', 'end_fdate',
    ];

    /**
     * Get the parent commentable model (post or video).
     */
    public function scheduleable()
    {
        return $this->morphTo();
    }

    public function getStartFdateAttribute()
    {
        return $this->formatDate($this->start_date);
    }

    public function getEndFdateAttribute()
    {
        return $this->formatDate($this->end_date);
    }
}
