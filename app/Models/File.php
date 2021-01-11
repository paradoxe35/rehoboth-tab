<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'path', 'type'];


    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['public_path'];

    /**
     * Get the file path.
     *
     * @return string
     */
    public function getPublicPathAttribute()
    {
        return Storage::url($this->path);
    }

    /**
     * Get the parent imageable model (user or post).
     */
    public function fileable()
    {
        return $this->morphTo();
    }
}
