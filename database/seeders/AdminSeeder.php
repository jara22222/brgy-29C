<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin exists to prevent duplicate errors
        if (!User::where('email', 'admin@example.com')->exists()) {
            User::create([
                'firstName'   => 'Super',
                'middleName'  => null,
                'lastName'    => 'Admin',
                'name'        => 'Super Admin', // Concatenated name
                'email'       => 'admin@example.com',
                'userName'    => 'admin',
                'password'    => Hash::make('password123'), // Default password
                'role'        => 'admin', // Crucial: Sets the role to admin
                
                // Required Personal/Address fields to satisfy database constraints
                'gender'      => 'Male',
                'civilStatus' => 'Single',
                'dateOfBirth' => '1990-01-01',
                'mobileNo'    => '09123456789',
                'street'      => 'Barangay Hall',
                'purok'       => '1',
                'barangay'    => 'Centro',
                'city'        => 'Davao City',
                'province'    => 'Davao del Sur',
                'postal'      => '8000',
            ]);
        }
    }
}