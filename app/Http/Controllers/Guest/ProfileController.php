<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\AppProfile\AppProfile;
use App\Models\Profil;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(string $name)
    {
        $profile = Profil::search($name)->first();

        return [
            'profile' => $profile ? new AppProfile($profile) : null
        ];
    }
}
