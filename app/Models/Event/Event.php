<?php

namespace App\Models\Event;

use App\Models\Morphs\Address;
use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use App\Models\Morphs\Organizer;
use App\Models\Morphs\Schedule;
use App\Models\Morphs\Tag;
use App\Models\Morphs\Ticket\Ticket;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 
        'label', 
        'description', 
        'text',
        'start_date',
        'start_time',
        'end_date',
        'end_time',
        'enable_registration',
        'registration_deadline'
    ];


    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function photos()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function ticket()
    {
        return $this->morphOne(Ticket::class, 'ticketable');
    }

    public function schedules()
    {
        return $this->morphMany(Schedule::class, 'scheduleable');
    }

    public function tags()
    {
        return $this->morphMany(Tag::class, 'tagable');
    }

    public function organizers()
    {
        return $this->morphMany(Organizer::class, 'organizerable');
    }
}
