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
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->string('purchase_number')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('due_date')->nullable();

            $table->string('payment_type')->nullable(); // cash, credit, bank
            $table->string('status')->nullable();       // pending, paid, partial, cancelled
            $table->decimal('subtotal', 12, 2)->nullable();
            $table->decimal('discount', 12, 2)->nullable();
            $table->decimal('tax', 12, 2)->nullable();
            $table->decimal('shipping_cost', 12, 2)->nullable();
            $table->decimal('total', 12, 2)->nullable();
            $table->decimal('paid_amount', 12, 2)->nullable();
            $table->decimal('remaining_amount', 12, 2)->nullable();

            $table->string('supplier_name')->nullable();
            $table->string('supplier_phone')->nullable();
            $table->string('supplier_tax_number')->nullable();

            $table->string('warehouse_name')->nullable();
            $table->text('notes')->nullable();
            $table->text('terms')->nullable();

        
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('received_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
