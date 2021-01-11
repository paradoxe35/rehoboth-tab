<div>
    <button class="button"
        onclick='openParentModal("sermonsIndex", { type: "video", data: @json($video) }, "{{ Str::random() }}")'>
        {{ __("Video") }}
    </button>

    <button class="button"
        onclick='openParentModal("sermonsIndex", { type: "audios", data: @json($audios) }, "{{ Str::random() }}")'>
        {{ __("Audios") }}
    </button>

    <button class="button"
        onclick='openParentModal("sermonsIndex", { type: "documents", data: @json($documents) }, "{{ Str::random() }}")'>
        {{ __("Documents") }}
    </button>

    <button class="button"
        onclick='openParentModal("sermonsIndex", { type: "image", data: @json($image) }, "{{ Str::random() }}")'>
        {{ __("Image") }}
    </button>
</div>