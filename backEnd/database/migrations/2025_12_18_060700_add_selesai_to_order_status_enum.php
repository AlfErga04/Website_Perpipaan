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
        // Modify enum to include 'selesai'
        // Note: using raw statement because Laravel's schema builder doesn't alter enum values directly
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `orders` MODIFY `order_status` ENUM('dikonfirmasi','dibuat','dipacking','siap diambil','ditolak','selesai') NOT NULL");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to previous enum without 'selesai'
        \Illuminate\Support\Facades\DB::statement("ALTER TABLE `orders` MODIFY `order_status` ENUM('dikonfirmasi','dibuat','dipacking','siap diambil','ditolak') NOT NULL");
    }
};
