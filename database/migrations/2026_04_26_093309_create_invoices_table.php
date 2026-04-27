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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('invoice_type_id')->constrained('invoice_types')->cascadeOnDelete();
            $table->string('invoice_number');
            $table->string('invoice_type')->nullable();
            $table->string('payment_type')->nullable();
            $table->date('invoice_date');
            $table->date('due_date');
            $table->string('car_no')->nullable();
            $table->string('car_type')->nullable();
            $table->string('car_model')->nullable();
            $table->string('car_color')->nullable();
            $table->string('car_year')->nullable();
            $table->string('car_vin')->nullable();
            $table->string('car_plate')->nullable();
            $table->string('car_chassis')->nullable();
            $table->string('car_engine')->nullable();
            $table->string('car_transmission')->nullable();
            $table->string('car_fuel')->nullable();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('tax', 10, 2);
            $table->decimal('total', 10, 2);
            $table->decimal('paid_amount', 10, 2)->default(0);
            $table->decimal('balance', 10, 2)->default(0);
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
