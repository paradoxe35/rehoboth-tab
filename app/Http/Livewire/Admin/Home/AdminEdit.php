<?php

namespace App\Http\Livewire\Admin\Home;

use App\Rules\ValidPhone;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Livewire\Component;

class AdminEdit extends Component
{
    public $email;
    public $phone;
    public $name;

    public $password;
    public $new_password;
    public $new_password_confirmation;

    public function mount()
    {
        $auth = $this->auth();

        $this->email = $auth->email;
        $this->phone = $auth->phone;
        $this->name = $auth->name;
    }


    public function updateUser()
    {
        $auth = $this->auth();

        if ($auth->email == config('app.admin')) {
            return session()->flash("failed", "Cet utilisateur ne peut pas être modifié");
        }

        $data = $this->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($auth->id)],
            'phone' => ['required', new ValidPhone, Rule::unique('users')->ignore($auth->id)],
        ]);

        $auth->fill($data)->save();

        session()->flash("edited", "Modifications enregistrées avec succès");
    }


    public function updateUserPassword()
    {
        $auth = $this->auth();

        $data = $this->validate([
            'password' => ['required', 'string', 'max:255', 'password:web'],
            'new_password' => ['required', 'string', 'max:255', 'min:8', 'confirmed'],
        ]);

        $auth->fill([
            'password' => Hash::make($data['new_password'])
        ])->save();

        session()->flash("editedPwd", "Modifications enregistrées avec succès");
    }


    public function auth()
    {
        /**
         * @var mixed
         */
        $auth = auth()->user();
        if (!$auth || $auth && !$auth->superAdmin()) {
            return ddd();
        }

        return $auth;
    }

    public function render()
    {
        return view('livewire.admin.home.admin-edit');
    }
}
