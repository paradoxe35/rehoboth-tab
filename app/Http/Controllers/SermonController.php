<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SermonController extends Controller
{
    public function index()
    {
        return inertia('Sermons/Sermons');
    }
}
