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
     * The number of seconds before the job should be made available.
     *
     * @var \DateTimeInterface|\DateInterval|int|null
     */
    public $delay = 3;

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
            ->image($this->blog->image->public_path)
            ->data(['url' => $this->blog->guestRoute(true)]);

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
