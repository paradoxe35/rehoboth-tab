<?php

namespace App\Notifications\Blog;

use App\Models\Blog\Blog;
use App\Notifications\HasWebPush;
use Illuminate\Bus\Batchable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BlogCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable, HasWebPush, Batchable;

    private $blog;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Blog $blog)
    {
        $this->blog = $blog;
    }

    /**
     * Get the web push representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toWebPush($notifiable, $notification)
    {
        $notify = $this->message('Blog')
            ->body($this->blog->title)
            ->data(['url' => $this->blog->guestRoute(true)]);

        if ($this->blog->image) {
            $notify->image($this->blog->image->public_path);
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
