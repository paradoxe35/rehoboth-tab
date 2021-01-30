<?php

namespace App\Models\Blog;

use App\Models\Morphs\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = ['title', 'slug', 'image', 'image_path', 'json', 'description', 'author', 'blog_category_id'];


    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function image() {
        return $this->morphOne(Image::class, 'imageable');
    }
}
