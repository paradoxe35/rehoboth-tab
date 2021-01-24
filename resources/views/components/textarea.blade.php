<label class="form-label">
    {{ __($label) }}
    @if ($optional)
    <small>({{ __($optionalText) }})</small>
    @endif
</label>
@if ($hasWire)
<textarea {{ $attributes }} label="{{ $inputLabel }}" wire:model.lazy="{{ $model }}" name="{{ $model }}"
    class="form-control @error($model) is-invalid @enderror" rows="3"></textarea>
@else
<textarea {{ $attributes }} label="{{ $inputLabel }}" name="{{ $model }}"
    class="form-control @error($model) is-invalid @enderror" rows="3"></textarea>
@endif


@error($model)<div class="invalid-feedback">{{$message}}</div>@enderror