<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Textarea extends Component
{
    public $model;

    public $label;

    public $inputLabel;

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
        bool $hasWire =  true,
        string $inputLabel =  ''
    ) {
        $this->model = $model;
        $this->label = $label;
        $this->optional = $optional;
        $this->optionalText = $optionalText;
        $this->hasWire = $hasWire;
        $this->inputLabel = $inputLabel;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.textarea');
    }
}
