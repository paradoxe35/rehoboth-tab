<?php

namespace App\Events\Profile;

use App\Models\Profil;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProfileDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The file instance.
     *
     * @var \App\Models\Profil
     */
    public $profile;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Profil $profile)
    {
        $this->profile = $profile;
    }

}
