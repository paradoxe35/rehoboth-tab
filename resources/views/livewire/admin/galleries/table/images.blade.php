<div>
    <button class="button"
        onclick='openParentModal("galleriesArticles", { type: "images", data: @json($images) }, "{{ Str::random() }}")'>
        {{ __("Images") }} ({{ count($images) }})
    </button>
</div>