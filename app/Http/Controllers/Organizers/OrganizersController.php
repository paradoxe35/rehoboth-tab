<?php

namespace App\Http\Controllers\Organizers;

use App\Http\Controllers\Controller;
use App\Models\AppOrganizer;
use Illuminate\Http\Request;

class OrganizersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AppOrganizer::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:2', 'string']
        ]);

        return AppOrganizer::create([
            'name' => $request->name
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(AppOrganizer $organizer)
    {
        $organizer->delete();

        return $organizer;
    }
}
