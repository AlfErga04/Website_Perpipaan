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
        Schema::table('alumni', function (Blueprint $table) {
            //
            $table->string('job_sector');
            $table->string('company_name');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('alumni', function (Blueprint $table) {
            //
            $table->dropColumn('job_sector');
            $table->dropColumn('company_name');

        });
    }
};
