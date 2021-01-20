<?php

namespace App\Http\Livewire\Admin\Events;

use App\Models\Event\Event;
use Livewire\Component;
use Livewire\WithFileUploads;


class ShowEdit extends Component
{

    use WithFileUploads;

    public Event $event;


    public function render()
    {
        return view('livewire.admin.events.show-edit');
    }
}
