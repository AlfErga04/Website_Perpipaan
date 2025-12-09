<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AlumniResource\Pages;
use App\Models\Alumni;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Select;
use Filament\Tables\Columns\TextColumn;

class AlumniResource extends Resource
{
    protected static ?string $model = Alumni::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('nim')
                ->label('NIM')
                ->required()
                ->unique(ignoreRecord: true)
                ->maxLength(20),

            TextInput::make('name')
                ->label('Nama')
                ->required()
                ->maxLength(100),

            // Tahun Masuk
            Select::make('tahun_masuk')
                ->label('Tahun Masuk')
                ->options(array_combine(
                    range(date('Y'), 1990),
                    range(date('Y'), 1990)
                ))
                ->required(),

            // Tahun Lulus
            Select::make('tahun_lulus')
                ->label('Tahun Lulus')
                ->options(array_combine(
                    range(date('Y'), 1990),
                    range(date('Y'), 1990)
                ))
                ->required(),

            // Sektor Pekerjaan
            Select::make('job_sector')
                ->label('Sektor Pekerjaan')
                ->options([
                    'maritim_perkapalan' => 'Industri maritim & perkapalan',
                    'migas' => 'Industri migas',
                    'energi_listrik' => 'Energi dan listrik',
                    'kimia' => 'Industri kimia',
                    'konstruksi_infrastruktur' => 'Konstruksi & infrastruktur',
                    'lain_lain' => 'Lain-lain'
                ])
                ->searchable()
                ->required(),

            // Tambahan baru — tempat bekerja
            TextInput::make('company_name')
                ->label('Tempat Bekerja')
                ->maxLength(255)
                ->placeholder('Contoh: Pertamina, PLN, Waskita')
                ->nullable(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('nim')
                    ->label('NIM')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('name')
                    ->label('Nama')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('tahun_masuk')
                    ->label('Masuk'),

                TextColumn::make('tahun_lulus')
                    ->label('Lulus'),

                // Kolom baru tempat bekerja
                TextColumn::make('company_name')
                    ->label('Tempat Bekerja')
                    ->sortable()
                    ->searchable(),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime('d M Y'),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAlumnis::route('/'),
            'create' => Pages\CreateAlumni::route('/create'),
            'edit' => Pages\EditAlumni::route('/{record}/edit'),
        ];
    }
}
