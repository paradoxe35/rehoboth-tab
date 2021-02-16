<?php

namespace App;

use Butschster\Head\Facades\Meta;

class AppMeta
{
    static public function metas(
        ?string $title,
        ?string $image,
        ?string $description = null
    ) {
        $image = $image ?: asset('favicon/cross.png');

        Meta::prependTitle($title);

        if ($description == 'default') {
            $description = config('meta_tags.description.default');
        } elseif ($description) {
            Meta::setDescription($description);
        } else {
            Meta::setDescription('');
        }

        $title = $title ? $title . " - " .  config('app.name') : config('app.name');

        Meta::addMeta('og:title', ['content' => $title]);
        Meta::addMeta('twitter:title', ['content' => $title]);

        Meta::addMeta('og:image', ['content' => $image]);
        Meta::addMeta('twitter:image', ['content' => $image]);

        Meta::addMeta('twitter:description', ['content' => $description]);
        Meta::addMeta('og:description', ['content' => $description]);
    }
}
