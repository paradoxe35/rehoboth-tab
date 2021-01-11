<label class="form-label d-block">
    {{ __($label) }}
    @if ($optional)
    <small>({{ __($optionalText) }})</small>
    @endif
</label>
<input type="file" {{ $attributes }}>
@if ($hasWire)
<input type="file" class="d-none" {{ $attributes }} label="{{ $inputLabel ?? '' }}" wire:model="{{ $model }}"
    name="{{ $model }}" class="form-control @error($model) is-invalid @enderror">
@else
<input type="file" {{ $attributes }} name="{{ $model }}" label="{{ $inputLabel ?? '' }}"
    class="form-control @error($model) is-invalid @enderror">
@endif


@error($model)<div class="invalid-feedback">{{$message}}</div>@enderror