<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $email = env('APP_ADMIN_EMAIL');
        $password = env('APP_ADMIN_PASSWORD');

        var_dump($email, $password);

        if (!$email || !$password) {
            throw new \Error('Admin email or password is not set');
        }

        User::create([
            'name' => 'Rehoboth Admin',
            'email' => $email,
            'password' => Hash::make($password),
            'super_admin' => true
        ]);

        return 0;
    }
}
