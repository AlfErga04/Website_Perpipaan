<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MerchResource\Pages;
use App\Models\Merch;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class MerchResource extends Resource
{
    protected static ?string $model = Merch::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    protected static ?string $navigationGroup = 'Catalog';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form
            ->schema([
                TextInput::make('name')->required(),
                Textarea::make('description'),
                TextInput::make('price')->numeric()->required(),
                FileUpload::make('image')
                    ->directory('merch')
                    ->image()
                    ->maxSize(2048)
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
            ->columns([
                ImageColumn::make('image')->square(),
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('price')->money('IDR')->sortable(),
                TextColumn::make('created_at')->dateTime(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListMerches::route('/'),
            'create' => Pages\CreateMerch::route('/create'),
            'edit'   => Pages\EditMerch::route('/{record}/edit'),
        ];
    }
}
