<?php

namespace App\Http\Livewire\Admin\Home;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Livewire\Component;

class AdminCreate extends Component
{

    public $email;
    public $phone;
    public $name;
    public $password;
    public $password_confirmation;
    public $super_admin;
    /**
     * @var \Illuminate\Support\Collection
     */
    public $users = null;

    public $rules = [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'phone' => ['required', 'regex:/^[0-9\-\(\)\/\+\s]*$/', 'unique:users'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
        'super_admin' => ['nullable', 'boolean']
    ];

    public function updated($propertyName)
    {
        $this->validateOnly($propertyName);
    }

    public function mount()
    {
        $this->users = User::latest()
            ->get();
    }

    public function store()
    {
        $data = (object) $this->validate();

        if (count($this->users) >= 20) {
            session()->flash("failed", "Vous ne pouvez pas enregistrer plus de 20 adminstrateurs");
            return null;
        }

        $this->auth();

        $user = User::create([
            'email' => $data->email,
            'name' => $data->name,
            'phone' => $data->phone,
            'password' => Hash::make($data->password),
            'super_admin' => !!$data->super_admin
        ]);

        $this->users->add($user);

        $this->email = '';
        $this->name = '';
        $this->phone = '';
        $this->password = '';
        $this->password_confirmation = '';

        session()->flash("created", "Administrateur enregistré avec succès");
    }

    public function delete($userId)
    {
        $auth = $this->auth();

        if ($auth->id == $userId || $auth->email == config('app.admin')) {
           return null;
        }

        $user = User::find($userId);
        if (!$user) return null;

        $user->delete();


        $this->users = $this->users
            ->filter(fn ($u) => $u->id != $userId);
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
        return view('livewire.admin.home.admin-create');
    }
}
