<?php

namespace App\Models\Morphs\Ticket;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['type', 'remaining'];

    /**
     * Get the parent imageable model (user or post).
     */
    public function ticketable()
    {
        return $this->morphTo();
    }


    public function options()
    {
        return $this->hasMany(TicketOption::class);
    }
}
