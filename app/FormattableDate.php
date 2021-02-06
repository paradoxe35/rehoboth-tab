<?php

namespace App;

use Illuminate\Support\Carbon;

trait FormattableDate
{

    private function getF(Carbon $d)
    {
        return $d->format('F d, Y');
    }

    private function formatDate(Carbon $date)
    {
        $formatted = explode(' ', $this->getF($date));
        $formatted[0] = trans($formatted[0]);

        return implode(' ', $formatted);
    }
}
