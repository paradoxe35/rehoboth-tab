<livewire:admin.home.admin-edit />

@if (Auth::user()->superAdmin())
<hr>
<livewire:admin.home.admin-create />
@endif