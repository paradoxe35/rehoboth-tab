<?php

namespace App\Events\Models;

use App\Models\Morphs\Image;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ImageDeleted
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    /**
     * The image instance.
     *
     * @var \App\Models\Morphs\Image
     */
    public $image;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Image $image)
    {
        $this->image = $image;
    }
}
