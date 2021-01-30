<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $fillable = ['name', 'icon'];

    
    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}
