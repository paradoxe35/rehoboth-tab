<button class="btn btn-{{ $color }} {{ $class }}" {{ $target ? "wire:target={$target}" : '' }} {{ $attributes }}
    wire:loading.attr="disabled">
    <div class="d-flex align-content-center align-items-center">
        <span>{{ $slot ?? '' }}</span>
        <span class="mx-1 d-none" {{ $target ? "wire:target={$target}" : '' }}
            wire:loading.class.remove="d-none"></span>
        <span class="spinner-border spinner-border-sm d-none" {{ $target ? "wire:target={$target}" : '' }}
            wire:loading.class.remove="d-none" role="status" aria-hidden="true"></span>
        <span class="visually-hidden d-none" {{ $target ? "wire:target={$target}" : '' }}
            wire:target="{{ $target }}" wire:loading.class.remove="d-none">{{ __("Chargement") }}...</span>
    </div>
</button>