<?php

namespace App\Models;

use App\FormattableDate;
use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Sermon extends Model
{
    use HasFactory, FormattableDate;

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'date',
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['subject', 'preacher', 'description', 'date'];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['image', 'audios', 'video', 'documents', 'f_date'];



    public function getFDateAttribute()
    {
        return $this->formatDate($this->date);
    }

    public function guestRoute($absolute = false)
    {
        return route(
            'guest.sermons.show',
            ['sermon' => $this->id, 'slug' => Str::slug($this->subject)],
            $absolute
        );
    }



    public function getImageAttribute()
    {
        return  $this->image()->first();
    }

    public function getAudiosAttribute()
    {
        return  $this->audios()->get();
    }

    public function getVideoAttribute()
    {
        return  $this->video()->first();
    }

    public function getDocumentsAttribute()
    {
        return  $this->documents()->get();
    }


    public function files()
    {
        return $this->morphMany(File::class, 'fileable');
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function video()
    {
        return $this->files()->where('type', 'video');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function audios()
    {
        return $this->files()->where('type', 'audio');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function documents()
    {
        return $this->files()->where('type', 'document');
    }
}
