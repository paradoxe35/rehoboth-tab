<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use Illuminate\Http\Request;

class SermonsController extends Controller
{
    public function index()
    {
        return view('admin.pages.sermons.index');
    }

    public function create()
    {
        return view('admin.pages.sermons.create');
    }

    public function edit(Sermon $sermon)
    {
        return view('admin.pages.sermons.edit', compact('sermon'));
    }
}
