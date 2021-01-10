<?php

namespace App\View\Components;

use Illuminate\View\Component;

class InputFile extends Component
{
    public $model;

    public $label;

    public $optional;

    public $optionalText;

    public $hasWire;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        string $model,
        string $label,
        bool $optional = false,
        string $optionalText = 'Optionnel',
        bool $hasWire =  true
    ) {
        $this->model = $model;
        $this->label = $label;
        $this->optional = $optional;
        $this->optionalText = $optionalText;
        $this->hasWire = $hasWire;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.input-file');
    }
}
