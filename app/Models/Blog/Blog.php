<?php

namespace App\Models\Blog;

use App\Events\Blog\BlogCreated;
use App\Events\Blog\BlogDeleted;
use App\FormattableDate;
use App\Models\Morphs\Image;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory, FormattableDate;


    /**
     * The event map for the model.
     *
     * @var array
     */
    protected $dispatchesEvents = [
        'deleted' => BlogDeleted::class,
        'created' => BlogCreated::class
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'date'
    ];


    /**
     * @var array
     */
    protected $fillable = ['title', 'slug', 'json', 'description', 'author', 'blog_category_id'];


    public function contentLimit(int $limit = 260)
    {
        $contentBlock = json_decode($this->json);
        $description = $this->description .  ($this->description[-1] === "." ? '' : '.');

        foreach ($contentBlock->blocks as $block) {
            if (strlen($description) >= $limit) break;

            if ($block->type === 'paragraph') {
                $description .= " " . strip_tags($block->data->text);
            }
        }

        return substr($description, 0, $limit);
    }


    public function guestRoute()
    {
        return route(
            'guest.blog.show',
            ['blog' => $this->id, 'slug' => $this->slug],
            false
        );
    }

    public function getDateAttribute()
    {
        return $this->formatDate($this->created_at);
    }


    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function blogCategory()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
