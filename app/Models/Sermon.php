<?php

namespace App\Models;

use App\Events\Models\SermonDeleted;
use App\Models\Morphs\File;
use App\Models\Morphs\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sermon extends Model
{
    use HasFactory;


    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => SermonDeleted::class,
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
    protected $appends = ['image', 'audios', 'video', 'documents'];


   
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
