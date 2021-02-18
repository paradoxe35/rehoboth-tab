<?php

namespace App\Events\Gallery;

use App\Models\Gallery;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GalleryDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    
    /**
     * The gallery instance.
     *
     * @var \App\Models\Gallery
     */
    public $gallery;


    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Gallery $gallery)
    {
        $this->gallery = $gallery;
    }

}
