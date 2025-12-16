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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('order_code')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('order_date');
            // $table->string('order_status');
            $table->enum('order_status', [
                'dikonfirmasi',
                'dibuat',
                'dipacking',
                'siap diambil',
                'ditolak'
            ]);

            $table->string('item_name');
            $table->integer('quantity')->unsigned();
            $table->decimal('price', 10, 2);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
