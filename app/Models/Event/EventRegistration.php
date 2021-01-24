<?php

namespace App\Models\Event;

use App\Models\Morphs\Ticket\TicketOption;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phone', 'email', 'regid', 'paid', 'ticket_option_id'
    ];


    public function ticketOption() {
        return $this->belongsTo(TicketOption::class);
    }

    public function event() {
        return $this->belongsTo(Event::class);
    }
}
