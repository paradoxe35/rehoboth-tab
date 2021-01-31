<?php

namespace App\View\Components\Livewire\Table;

use Illuminate\View\Component;

class Btn extends Component
{

    public $label;
    public $event;
    public $type;
    public $datas;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $label, string $event, string $type, $datas)
    {
        $this->label = $label;
        $this->event = $event;
        $this->type = $type;
        $this->datas = $datas;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.livewire.table.btn');
    }
}
