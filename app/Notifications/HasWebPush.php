<?php

namespace App\Notifications;

use NotificationChannels\WebPush\WebPushMessage;
use NotificationChannels\WebPush\WebPushChannel;

trait HasWebPush
{
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
     * @param string $title
     * 
     * @return WebPushMessage
     */
    public function message(string $title)
    {
        $appname = config('app.name');

        return (new WebPushMessage)
            ->title("$appname - $title")
            ->icon(asset('favicon/cross.png'))
            ->badge(asset('favicon/cross.png'))
            ->vibrate([100, 50, 100])
            ->options(['TTL' => 5184000]);
    }
}
