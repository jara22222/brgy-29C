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
        Schema::table('users', function (Blueprint $table) {
            $table->string('firstName')->nullable();
            $table->string('middleName')->nullable();
            $table->string('lastName')->nullable();
            $table->string('gender')->nullable();
            $table->string('civilStatus')->nullable();
            $table->date('dateOfBirth')->nullable();
            $table->string('street')->nullable();
            $table->string('purok')->nullable();
            $table->string('barangay')->nullable();
            $table->string('city')->nullable();
            $table->string('province')->nullable();
            $table->string('postal')->nullable();
            $table->string('mobileNo')->nullable();
            $table->string('userName')->unique()->nullable();
            $table->string('role')->default('resident');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'firstName',
                'middleName',
                'lastName',
                'gender',
                'civilStatus',
                'dateOfBirth',
                'street',
                'purok',
                'barangay',
                'city',
                'province',
                'postal',
                'mobileNo',
                'userName',
                'role',
            ]);
        });
    }
};
