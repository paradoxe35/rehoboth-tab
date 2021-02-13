<button wire:click="paymentAction({{ $id }})" class="button {{ !$paid ? 'info' : '' }}">
    {{ !$paid ? __("Marquer comme payé") : __("Annuler le paiement") }}
</button>