<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function profiles()
    {
        return view('admin.pages.settings.profiles');
    }

    public function churchDetails()
    {
        return view('admin.pages.settings.church-details');
    }
}
