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

        /**
         * @var \App\Models\WebPush
         */
        $client = WebPush::query()->where('token', $request->client)->first();
        $uuid = $this->client();

        if (!$client) {
            /**
             * @var \App\Models\WebPush
             */
            $client = WebPush::create([
                'ip' => $request->ip(),
                'token' => $uuid
            ]);
        }

        $client->updatePushSubscription(
            $subscription->endpoint,
            $subscription->publicKey,
            $subscription->authToken,
            $subscription->contentEncoding
        );

        return response()->json(['uuid' => $uuid], $client->wasRecentlyCreated ? 201 : 200);
    }

    public function client()
    {
        return Str::random(150);
    }
}
