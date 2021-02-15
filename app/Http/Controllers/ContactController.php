<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\ChurchDetails\ChurchDetails;
use App\Http\Resources\Guest\Programme\ProgrammeCollection;
use App\Models\ChurchDetail;
use App\Models\Message;
use App\Models\Programme;
use Butschster\Head\Facades\PackageManager;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        $programmes = new ProgrammeCollection(
            Programme::query()->limit(7)->get()
        );

        $model = ChurchDetail::first();
        $churchDetails = $model ? new ChurchDetails($model) : null;

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

        return [
            'message' => trans('Votre message a été envoyé, merci!')
        ];
    }
}
