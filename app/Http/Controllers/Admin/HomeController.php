<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog\Blog;
use App\Models\Event\Event;
use App\Models\Gallery;
use App\Models\Sermon;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $blog = Blog::count();
        $event = Event::count();
        $sermon = Sermon::count();
        $gallery = Gallery::count();

        return view('admin.pages.home', compact('blog', 'event', 'sermon', 'gallery'));
    }
}
