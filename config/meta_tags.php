<?php

use Butschster\Head\MetaTags\Viewport;

return [
    /*
     * Meta title section
     */
    'title' => [
        'default' => env('APP_NAME'),
        'separator' => '-',
        'max_length' => 255,
    ],


    /*
     * Meta description section
     */
    'description' => [
        'default' => "Nous croyons au message de la fin des temps et ce message a été amené par un prophète confirmé et oint de notre Dieu Jésus-Christ, le nom de notre prophète est William Marrion Branham. Rehoboth Tabernacle est un endroit pour vous et pour tout le monde, parce que nous croyons que le puits de la parole doit être accessible à tous.",
        'max_length' => 255,
    ],


    /*
     * Meta keywords section
     */
    'keywords' => [
        'default' => null,
        'max_length' => 255
    ],

    /*
     * Default packages
     *
     * Packages, that should be included everywhere
     */
    'packages' => [
        // 'jquery', 'bootstrap', ...
    ],

    'charset' => 'utf-8',
    'robots' => null,
    'viewport' => Viewport::RESPONSIVE,
    'csrf_token' => true,
];