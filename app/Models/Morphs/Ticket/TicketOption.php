<?php

namespace App\Models\Morphs\Ticket;

use App\Models\Event\EventRegistration;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketOption extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'price', 'stock', 'default'];


    public function ticket()
    {
        return $this->belongsTo(Ticket::class);
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);;
    }
}
