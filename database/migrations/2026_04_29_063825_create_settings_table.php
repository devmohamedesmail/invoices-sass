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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('app_name_ar');
            $table->string('app_name_en');
            $table->string('copy_right_ar')->nullable();
            $table->string('copy_right_en')->nullable();
            $table->longText('description_ar')->nullable();
            $table->longText('description_en')->nullable();

            $table->longText('app_logo')->nullable();
            $table->longText('app_logo_black')->nullable();

            $table->longText('app_favicon')->nullable();
            $table->longText('app_favicon_white')->nullable();
            $table->longText('about_ar')->nullable();
            $table->longText('about_en')->nullable();
            $table->string('phone')->nullable();
            $table->longText('whatsapp')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
