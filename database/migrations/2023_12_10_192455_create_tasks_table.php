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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->nullable(false);
            $table->text('description')->nullable(true);
            $table->unsignedBigInteger('status_id')->default(1);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('status_id')->references('id')->on('task_statuses');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
