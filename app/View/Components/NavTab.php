<?php

namespace App\View\Components;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class NavTab extends Component
{

    public $tabs;

    public $tabsId;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(array $tabs = [])
    {
        $this->tabs = $tabs;
        $this->tabsId = Str::random();
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.nav-tab');
    }
}
