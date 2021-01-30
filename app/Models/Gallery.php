<?php

namespace App\Models;

use App\Events\Models\GalleryDeleted;
use App\Models\Morphs\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

/**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => GalleryDeleted::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description'];


    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
}
