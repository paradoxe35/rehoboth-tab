<?php

namespace App\View\Components\Livewire;

use Illuminate\View\Component;

class Frame extends Component
{
    /**
     * @var string
     */
    public $ref;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $ref)
    {
        $this->ref = $ref;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.livewire.frame');
    }
}
