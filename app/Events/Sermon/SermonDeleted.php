<?php

namespace App\Events\Sermon;

use App\Models\Sermon;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SermonDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

     /**
     * The sermon instance.
     *
     * @var \App\Models\Sermon
     */
    public $sermon;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Sermon $sermon)
    {
        $this->sermon = $sermon;
    }
    
}
