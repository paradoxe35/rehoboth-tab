<?php

namespace App\Models\Morphs;

use App\Events\Models\ImageDeleted;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Image extends Model
{
    use HasFactory;

    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => ImageDeleted::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['path', 'width', 'height', 'caption', 'date', 'type'];


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
    public function imageable()
    {
        return $this->morphTo();
    }
}
