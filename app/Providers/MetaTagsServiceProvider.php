<?php

namespace App\Providers;

use Butschster\Head\Contracts\Packages\PackageInterface;
use Butschster\Head\Facades\PackageManager;
use Butschster\Head\MetaTags\Meta;
use Butschster\Head\Contracts\MetaTags\MetaInterface;
use Butschster\Head\Contracts\Packages\ManagerInterface;
use Butschster\Head\Facades\Meta as FacadesMeta;
use Butschster\Head\Providers\MetaTagsApplicationServiceProvider as ServiceProvider;
use Butschster\Head\Packages\Entities\OpenGraphPackage;
use Butschster\Head\Packages\Entities\TwitterCardPackage;


class MetaTagsServiceProvider extends ServiceProvider
{
    protected function packages()
    {
        $og = new OpenGraphPackage('og');
        $twitterCard = new TwitterCardPackage('twitterCard');

        $og->setType('website');


        FacadesMeta::registerPackage($og);
        FacadesMeta::registerPackage($twitterCard);
    }

    // if you don't want to change anything in this method just remove it
    protected function registerMeta(): void
    {
        $this->app->singleton(MetaInterface::class, function () {
            $meta = new Meta(
                $this->app[ManagerInterface::class],
                $this->app['config']
            );

            // It just an imagination, you can automatically
            // add favicon if it exists
            // if (file_exists(public_path('favicon.ico'))) {
            //    $meta->setFavicon('/favicon.ico');
            // }

            // This method gets default values from config and creates tags, includes default packages, e.t.c
            // If you don't want to use default values just remove it.
            $meta->initialize();

            return $meta;
        });
    }
}