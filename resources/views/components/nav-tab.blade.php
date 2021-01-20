<div>
    <ul class="nav nav-pills my-4" id="pills-tab-{{ Str::kebab(implode('-', $tabs)) }}" role="tablist" wire:ignore>
        @foreach ($tabs as $key => $tab)
        <li class="nav-item" role="presentation">
            <a class="nav-link {{ $key == 0 ? 'active' : '' }} " id="pills-{{ Str::snake(Str::ascii($tab)) }}-tab"
                data-bs-toggle="pill" href="#pills-{{ Str::snake(Str::ascii($tab)) }}" role="tab"
                aria-controls="pills-{{ Str::snake(Str::ascii($tab)) }}" aria-selected="true">
                {{ __($tab) }}
            </a>
        </li>
        @endforeach
    </ul>

    <div class="tab-content" id="pills-tabContent-{{ Str::kebab(implode('-', $tabs)) }}">
        @foreach ($tabs as $key => $tab)
        <div class="tab-pane {{ $key == 0 ? 'show active': '' }}" id="pills-{{ Str::snake(Str::ascii($tab)) }}"
            role="tabpanel" aria-labelledby="pills-{{ Str::snake(Str::ascii($tab)) }}-tab" wire:ignore.self>
            {{ ${Str::snake(Str::ascii($tab))} ?? '' }}
        </div>
        @endforeach
    </div>

</div>