<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index()
    {
        return view('admin.pages.events.index');
    }

    public function create()
    {
        return view('admin.pages.events.create');
    }
}
