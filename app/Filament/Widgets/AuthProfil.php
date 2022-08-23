<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Closure;
use Filament\Tables;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class AuthProfil extends BaseWidget
{
    protected static ?string $heading = "Profil";

    protected int | string | array $columnSpan = 'full';

    protected static ?int $sort = 2;

    protected function getTableQuery(): Builder
    {
        return User::where('id', auth()->user()->id);
    }


    public function getDefaultTableRecordsPerPageSelectOption(): int
    {
        return 1;
    }

    protected function getTableColumns(): array
    {
        return [
            Tables\Columns\TextColumn::make('id'),
            Tables\Columns\TextColumn::make('email')
                ->label('E-mail'),
            Tables\Columns\TextColumn::make('name')
                ->label('Nom'),
            Tables\Columns\TextColumn::make('phone')
                ->label('Phone'),
            Tables\Columns\BadgeColumn::make('super_admin')
                ->getStateUsing(fn ($record): ?string => $record->super_admin ? 'Super Admin' : 'Admin')
                ->colors([
                    'success' => fn ($state): bool => boolval($state)
                ])
                ->label('Status')
        ];
    }
}
