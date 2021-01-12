<div>
    <ul class="nav nav-pills my-4" id="pills-tab-{{ Str::kebab(implode('-', $tabs)) }}" role="tablist" wire:ignore>
        @foreach ($tabs as $key => $tab)
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ $key == 0 ? 'active' : '' }} " id="pills-{{ Str::snake($tab) }}-tab"
                data-bs-toggle="pill" href="#pills-{{ Str::snake($tab) }}" role="tab"
                aria-controls="pills-{{ Str::snake($tab) }}" aria-selected="true">
                {{ __($tab) }}
            </a>
        </li>
        @endforeach
    </ul>

    <div class="tab-content" id="pills-tabContent-{{ Str::kebab(implode('-', $tabs)) }}">
        @foreach ($tabs as $key => $tab)
        <div class="tab-pane {{ $key == 0 ? 'show active': '' }}" id="pills-{{ Str::snake($tab) }}" role="tabpanel"
            aria-labelledby="pills-{{ Str::snake($tab) }}-tab" wire:ignore.self>
            {{ ${Str::snake($tab)} ?? '' }}
        </div>
        @endforeach
    </div>

</div>