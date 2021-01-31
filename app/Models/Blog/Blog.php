<?php

namespace App\Models\Blog;

use App\Events\Models\BlogDeleted;
use App\Models\Morphs\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;


    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => BlogDeleted::class,
    ];


    /**
     * @var array
     */
    protected $fillable = ['title', 'slug', 'json', 'description', 'author', 'blog_category_id'];


    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
