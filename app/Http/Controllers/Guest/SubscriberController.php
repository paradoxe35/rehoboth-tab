<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:subscribers']
        ]);

        Subscriber::create([
            'email' => $request->email
        ]);

        return response()->json([
            'message' => trans('Votre souscription a été effectuée avec succès')
        ], 201);
    }
}
