<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessagesController extends Controller
{
    public function index()
    {
        return view('admin.pages.messages');
    }

    public function update(Message $message)
    {
        $message->read = true;

        $message->save();

        $message->refresh();

        return $message;
    }
}
