<?php

namespace App\Notifications\Sermon;

use App\Models\Sermon;
use App\Notifications\HasWebPush;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SermonCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable, Batchable, HasWebPush;

    private $sermon;


    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Sermon $sermon)
    {
        $this->sermon = $sermon;
    }

    /**
     * Get the web push representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toWebPush($notifiable, $notification)
    {
        $notify = $this->message('Sermon')
            ->body($this->sermon->subject)
            ->data(['url' => $this->sermon->guestRoute(true)]);

        if ($this->sermon->image) {
            $notify->image($this->sermon->image->public_path);
        }

        return $notify;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [];
    }
}
