<?php

namespace App\Notifications\Event;

use App\Models\Event\Event;
use App\Notifications\HasWebPush;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EventCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable, HasWebPush, Batchable;

    private $event;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Event $event)
    {
        $this->event = $event;
    }


    /**
     * Get the web push representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toWebPush($notifiable, $notification)
    {
        $this->event = $this->event->refresh();

        $notify = $this->message('Événement')
            ->body($this->event->name)
            ->data(['url' => $this->event->guestRoute(true)]);

        if ($this->event->image) {
            $notify->image($this->event->image->public_path);
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
        return [
            //
        ];
    }
}
