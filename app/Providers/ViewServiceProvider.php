<?php

namespace App\Providers;

use App\View\Components\Button;
use App\View\Components\Input;
use App\View\Components\Livewire\Frame;
use App\View\Components\Spinner;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use Illuminate\View\View as IView;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->components();

        $this->composers();

        Blade::if('iflivewire', function () {
            return !is_null(session('livewire'));
        });
    }


    /**
     * @return void
     */
    private function components()
    {
        //
    }

    /**
     * @return void
     */
    private function composers()
    {
        View::composer('*', function (IView $view) {
            $view->with('app_name', config('app.name'));
        });
    }
}
