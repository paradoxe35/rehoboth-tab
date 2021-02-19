<?php

namespace App\Notifications\Sermon;

use App\Models\Sermon;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use NotificationChannels\WebPush\WebPushChannel;
use NotificationChannels\WebPush\WebPushMessage;

class SermonCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable, Batchable;


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
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [WebPushChannel::class];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toWebPush($notifiable, $notification)
    {
        $appname = config('app.name');
        
        $notify = (new WebPushMessage)
            ->title("$appname - Sermon")
            ->icon(asset('favicon/cross.png'))
            ->body($this->sermon->subject)
            ->action('Media', $this->sermon->guestRoute(true))
            ->vibrate([100, 50, 100])
            ->options(['TTL' => 5184000]);

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
