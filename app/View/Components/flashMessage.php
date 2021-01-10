<?php

namespace App\View\Components;

use Illuminate\View\Component;

class flashMessage extends Component
{

    public $session;
    public $type;
    public $top;
    public $reload;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $session, string $type, bool $top = false, bool $reload = false)
    {
        $this->session = $session;
        $this->type = $type;
        $this->top = $top;
        $this->reload = $reload;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.flash-message');
    }
}
