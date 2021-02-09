<?php

namespace App\Http\Controllers;

use App\Http\Resources\Guest\ChurchDetails\ChurchDetails;
use App\Http\Resources\Guest\Programme\ProgrammeCollection;
use App\Models\ChurchDetail;
use App\Models\Programme;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index(Request $request)
    {
        $programmes = new ProgrammeCollection(
            Programme::query()->limit(7)->get()
        );

        $model = ChurchDetail::first();
        $churchDetails = $model ? new ChurchDetails($model) : null;

        return inertia('Contact/Contact', [
            'programmes' => fn () => $programmes->toArray($request),
            'church_details' => fn() => $churchDetails->toArray($request)
        ]);
    }
}
