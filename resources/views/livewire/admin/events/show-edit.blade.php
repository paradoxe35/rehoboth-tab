<x-card>
    <x-livewire-js-instance />

    <x-nav-tab :tabs='["Détails", "Tickets", "Programmes", "Photos", "Inscriptions", "Autre Info"]'>
        
        <x-slot name="details">
            @include('livewire.admin.events.tabs.details')
        </x-slot>


        <x-slot name="tickets">
            @include('livewire.admin.events.tabs.tickets')
        </x-slot>

        <x-slot name="schedules">
            @include('livewire.admin.events.tabs.schedules')
        </x-slot>

        <x-slot name="photos">
            @include('livewire.admin.events.tabs.photos')
        </x-slot>


        <x-slot name="registrations">
            @include('livewire.admin.events.tabs.registrations')
        </x-slot>

        <x-slot name="other_info">
            @include('livewire.admin.events.tabs.other-info')
        </x-slot>

    </x-nav-tab>

</x-card>