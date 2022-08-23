<?php

namespace App\Filament\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Card;
use App\Models\Blog\Blog;
use App\Models\Event\Event;
use App\Models\Gallery;
use App\Models\Sermon;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getCards(): array
    {
        $blog = Blog::count();
        $event = Event::count();
        $sermon = Sermon::count();
        $gallery = Gallery::count();

        return [
            Card::make(trans("Sermons"), $sermon)->icon('heroicon-s-document'),
            Card::make(trans("Événements"), $event)->icon('heroicon-s-calendar'),
            Card::make(trans("Blogs"), $blog)->icon('heroicon-s-rss'),
            Card::make(trans("Galeries"), $gallery)->icon('heroicon-s-photograph'),
        ];
    }
}
