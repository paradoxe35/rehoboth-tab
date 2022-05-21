<?php

namespace Database\Seeders;

use App\Models\User;
use Error;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $email = env('APP_ADMIN_EMAIL');
        $password = config('APP_ADMIN_PASSWORD');
        if (!$email || !$password) {
            throw new \Error('Admin email or password is not set');
            return;
        }

        User::create([
            'name' => 'Rehoboth Admin',
            'email' => $email,
            'password' => Hash::make($password),
            'super_admin' => true
        ]);
    }
}
