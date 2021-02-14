<?php

namespace App\Repositories;


use App\Models\Event\Event;
use \Illuminate\Database\Eloquent\Builder;

class EventRepository
{

    /**
     * @var Builder
     */
    private Builder $builder;


    public function __construct()
    {
        $this->builder = Event::query();
    }


    public function getAvailable(): ?Builder
    {
        return $this->builder->whereDate('start_date', '>=', now())->latest();
    }
}
