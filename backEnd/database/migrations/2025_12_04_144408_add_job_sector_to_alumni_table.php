<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::table('alumni', function (Blueprint $table) {
        $table->enum('job_sector', [
            'maritim_perkapalan',
            'migas',
            'energi_listrik',
            'kimia',
            'konstruksi_infrastruktur',
        ])->nullable()->after('tahun_lulus');
    });
}

public function down(): void
{
    Schema::table('alumni', function (Blueprint $table) {
        $table->dropColumn('job_sector');
    });
}

};
