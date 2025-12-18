<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('form_himas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nim')->index();
            $table->string('kelas')->nullable();
            $table->string('angkatan')->nullable();
            $table->text('alasan')->nullable();
            $table->text('pengalaman')->nullable();
            $table->json('file_names')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_himas');
    }
};
