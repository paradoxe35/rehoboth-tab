<?php

namespace App\Http\Controllers\WebPush;

use App\Http\Controllers\Controller;
use App\Models\WebPush;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class WebPushController extends Controller
{
    public function vapidPublicKey()
    {
        return env('VAPID_PUBLIC_KEY');
    }

    public function register(Request $request)
    {
        $subscription = (object) $request->subscription;

        $client = WebPush::query()->where('token', $request->client)->first();
        $uuid = $this->client();

        if (!$client) {
            $client = WebPush::create([
                'ip' => $request->ip(),
                'token' => $uuid
            ]);
        }

        $client->updatePushSubscription($subscription->endpoint, $this->vapidPublicKey());

        return ['uuid' => $uuid];
    }

    public function client()
    {
        return Str::uuid();
    }
}
