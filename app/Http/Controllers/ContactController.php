<?php

namespace App\Http\Controllers;

use App\AppMeta;
use App\Http\Resources\Guest\ChurchDetails\ChurchDetails;
use App\Http\Resources\Guest\Programme\ProgrammeCollection;
use App\Models\ChurchDetail;
use App\Models\Message;
use App\Models\Programme;
use Illuminate\Http\Request;


class ContactController extends Controller
{
    public function index()
    {
        AppMeta::metas("Contact", null, "Pour toute information, prière ou autre, veuillez utiliser les coordonnées ci-dessous pour nous contacter");

        $programmes = new ProgrammeCollection(
            Programme::query()->limit(7)->get()
        );

        $model = ChurchDetail::first();
        $churchDetails = $model ? new ChurchDetails($model) : ['data' => null];

        return inertia('Contact/Contact', [
            'programmes' => $programmes,
            'church_details' => $churchDetails
        ]);
    }


    public function storeMessage(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'min:2', 'max:255'],
            'message' => ['required', 'string', 'min:15'],
            'country_name' => ['nullable', 'max:255'],
            'country_code' => ['nullable', 'max:255'],
        ]);

        Message::create($data);

        return response()->json([
            'message' => trans('Votre message a été envoyé, merci!')
        ], 201);
    }
}
