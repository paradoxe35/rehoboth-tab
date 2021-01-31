<button class="button"
    onclick='openParentModal("{{ $event }}", { type: "{{ $type }}", data: @json($data) }, "{{ Str::random() }}")'>
    {{ __($label) }}
</button>