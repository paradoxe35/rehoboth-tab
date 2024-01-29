<?php

namespace App\Models;

use App\Models\Morphs\Image;
use App\Searchable\SimpleTextSearchable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profil extends Model
{
    use HasFactory, SimpleTextSearchable;


    /**
     * The columns of the full text index
     */
    protected $searchable = ['name'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'phone', 'email', 'description'];


    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}
