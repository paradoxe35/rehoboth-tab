<label class="form-label">
    {{ __($label) }}
    @if ($optional)
    <small>({{ __($optionalText) }})</small>
    @endif
</label>
@if ($hasWire)
<input {{ $attributes }} label="{{ $inputLabel }}" wire:model.lazy="{{ $model }}" name="{{ $model }}"
    class="form-control @error($model) is-invalid @enderror">
@else
<input {{ $attributes }} label="{{ $inputLabel }}" name="{{ $model }}"
    class="form-control @error($model) is-invalid @enderror">
@endif


@error($model)<div class="invalid-feedback">{{$message}}</div>@enderror