<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sermon extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['subject', 'preacher', 'description', 'date'];


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
