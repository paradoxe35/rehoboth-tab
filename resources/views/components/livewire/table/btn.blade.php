<button class="button"
    onclick='openParentModal("{{ $event }}", { type: "{{ $type }}", data: @json($datas) }, "{{ Str::random() }}")'>
    {{ __($label) }} {{ $slot ?? '' }}
</button>