<?php

namespace App\Http\Controllers\Admin;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\ChurchDetail;
use App\Models\Profil;
use App\Models\Programme;
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

    public function tags()
    {
        return view('admin.pages.settings.tags');
    }

    public function organizers()
    {
        return view('admin.pages.settings.organizers');
    }


    public function storeProfile(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'unique:profils'],
            'phone' => ['nullable', 'regex:/^[0-9\-\(\)\/\+\s]*$/', 'unique:profils'],
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
        $details = ChurchDetail::first();

        if ($details) {
            $details->load('address');
        }

        return view('admin.pages.settings.church-details', compact('details'));
    }


    public function storeChurchDetails(Request $request)
    {
        $data = $request->validate([
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'regex:/^[0-9\-\(\)\/\+\s]*$/'],
            'description' => ['nullable', 'string', 'min:10'],
            'lat' => ['nullable', 'regex:/^(-?\d+(\.\d+)?)$/'],
            'lng' => ['nullable', 'regex:/^(-?\d+(\.\d+)?)$/'],

            'address' => ['nullable', 'string'],
            'venue' => ['nullable', 'string'],
            'city' => ['nullable', 'string'],
            'country' => ['nullable', 'string'],
            'state' => ['nullable', 'string'],
        ]);

        $details = $this->detailsInstance($request->only(['email', 'phone', 'description']));
        $address = $details->address;

        $addressFillable = [
            'venue' => $data['venue'],
            'address' => $data['address'],
            'city' => $data['city'],
            'state' => $data['state'],
            'country' => $data['country'],
            'map' => true,
            'longitude' => $data['lng'] ?? null,
            'latitude' => $data['lat'] ?? null
        ];

        if ($address) {
            $address->fill($addressFillable)->save();
        } else {
            $details->address()->create($addressFillable);
        }

        return [
            'message' => trans('Modifications enregistrées avec succès')
        ];
    }

    private function detailsInstance(array $data)
    {
        $details = ChurchDetail::first();

        if ($details) {
            $details->fill($data)->save();
            return $details;
        }
        return ChurchDetail::create($data);
    }

    public function programmes()
    {
        return view('admin.pages.settings.programmes');
    }

    public function programmesItems()
    {
        return Programme::all();
    }

    public function deleteProgramme(Programme $programme)
    {
        $programme->delete();

        return $programme;
    }

    public function storeProgrammes(Request $request)
    {
        $data = $request->validate([
            'day' => ['required', 'string', 'min:3'],
            'start_time' => ['required', 'string', 'regex:/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/'],
            'end_time' => ['required', 'string', 'regex:/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/'],
            'description' => ['nullable', 'string']
        ]);

        $start = strtotime("{$data['start_time']}");
        $end = strtotime("{$data['end_time']}");

        if ($end <= $start) {
            abort(422, trans("La heure de fin doit être postérieure à la heure de début"));
        }

        $programme = Programme::create($request->only(['day', 'start_time', 'end_time', 'description']));

        return [
            'message' => trans('Programme enregistré avec succès'),
            'programme' => $programme
        ];
    }
}
