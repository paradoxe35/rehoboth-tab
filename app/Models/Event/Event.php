<?php

namespace App\Models\Event;

use App\Events\Event\EventCreated;
use App\Events\Event\EventDeleted;
use App\FormattableDate;
use App\Models\Morphs\Address;
use App\Models\Morphs\Image;
use App\Models\Morphs\Organizer;
use App\Models\Morphs\Schedule;
use App\Models\Morphs\Tag;
use App\Models\Morphs\Ticket\Ticket;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Event extends Model
{
    use HasFactory, FormattableDate;

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => EventDeleted::class,
        'created' => EventCreated::class
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'registration_deadline' => 'date'
    ];

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
        'registration_deadline',
        'organizer_name',
        'organizer_email',
        'organizer_phone'
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'image', 'photos',
        'start_fdate', 'end_fdate',
        'start_idate', 'end_idate',
        'start_datetime', 'end_datetime'
    ];


    public function metaDescription() {
        return substr(strip_tags($this->text), 0, 257);
    }


    public function isAvailable()
    {
        return now()->isBefore($this->start_date) || $this->start_date->toDateString() == now()->toDateString();
    }

    public function canRegister()
    {
        return now()->isBefore($this->registration_deadline) ||
            $this->registration_deadline->toDateString() == now()->toDateString();
    }


    public function guestRoute()
    {
        return route(
            'guest.events.show',
            ['event' => $this->id, 'slug' => Str::slug($this->name)],
            false
        );
    }

    public function getStartFdateAttribute()
    {
        return $this->formatDate($this->start_date);
    }


    public function getEndFdateAttribute()
    {
        return $this->formatDate($this->end_date);
    }


    public function getStartIdateAttribute()
    {
        return $this->getF($this->start_date);
    }

    public function getEndIdateAttribute()
    {
        return $this->getF($this->end_date);
    }

    public function getStartDatetimeAttribute()
    {
        return $this->getF($this->start_date) . " " . $this->start_time;
    }

    public function getEndDatetimeAttribute()
    {
        return $this->getF($this->end_date) . " " . $this->end_time;
    }


    public function getImageAttribute()
    {
        return $this->images()
            ->getQuery()
            ->firstWhere('type', 'cover');
    }

    public function getPhotosAttribute()
    {
        return $this->images()
            ->getQuery()
            ->where('type', 'photo')->get();
    }


    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
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
