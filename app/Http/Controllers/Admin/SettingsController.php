<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\Profil;
use Illuminate\Http\Request;

class SettingsController extends Controller
{
    public function __construct()
    {
        $this->middleware(['optimizeImages'])
            ->only(['storeProfile']);
    }

    public function profiles()
    {
        return view('admin.pages.settings.profiles');
    }


    public function storeProfile(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:profils'],
            'phone' => ['required', 'regex:/^[0-9\-\(\)\/\+\s]*$/', 'unique:profils'],
            'email' => ['nullable', 'email'],
            'description' => ['required', 'string', 'min:10'],
            'image' => File::IMAGE_RULES
        ]);

        $profile = Profil::create($request->only(['name', 'phone', 'email', 'description']));

        $file = $request->file('image');

        File::storeImageMorph(
            $file,
            File::PROFILES_IMAGE_PATH,
            $profile->image(),
            $profile
        );

        return [
            'message' => trans('Profil enregistré avec succès')
        ];
    }

    public function churchDetails()
    {
        return view('admin.pages.settings.church-details');
    }
}
