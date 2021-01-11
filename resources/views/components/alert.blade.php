<div class="alert alert-{{ $type }}" role="alert">
    {{ $message ?: ($slot ?? '') }}
</div>