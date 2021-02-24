<?php

namespace App\Observers;

use App\Models\Profil;

class ProfilObserver
{
    /**
     * Handle the Profil "created" event.
     *
     * @param  \App\Models\Profil  $profil
     * @return void
     */
    public function created(Profil $profil)
    {
        //
    }

    /**
     * Handle the Profil "updated" event.
     *
     * @param  \App\Models\Profil  $profil
     * @return void
     */
    public function updated(Profil $profil)
    {
        //
    }

    /**
     * Handle the Profil "deleted" event.
     *
     * @param  \App\Models\Profil  $profil
     * @return void
     */
    public function deleted(Profil $profil)
    {
        $profil->image()->get()->each(fn ($img) => $img->delete());
    }

    /**
     * Handle the Profil "restored" event.
     *
     * @param  \App\Models\Profil  $profil
     * @return void
     */
    public function restored(Profil $profil)
    {
        //
    }

    /**
     * Handle the Profil "force deleted" event.
     *
     * @param  \App\Models\Profil  $profil
     * @return void
     */
    public function forceDeleted(Profil $profil)
    {
        $profil->image()->get()->each(fn ($img) => $img->delete());
    }
}
