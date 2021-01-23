<?php

namespace App\Models\Morphs;

use App\Events\Models\FileDeleted;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class File extends Model
{
    use HasFactory;


    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => FileDeleted::class,
    ];


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'path', 'type', 'width', 'height'];


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
