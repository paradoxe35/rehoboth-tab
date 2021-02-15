<div g-component="BsTabs">
    <ul class="nav nav-pills my-4" id="pills-tab-{{ $tabsId }}" role="tablist" wire:ignore>
        @foreach ($tabs as $key => $tab)
        <li class="nav-item" role="presentation" wire:ignore>
            <a class="nav-link {{ $key == 0 ? 'active' : 'mx-2' }} border-darken border" id="pills-{{ Str::snake(Str::ascii(is_array($tab) ? $tab['key']: $tab)) }}-tab"
                data-bs-toggle="pill" href="#pills-{{ Str::snake(Str::ascii(is_array($tab) ? $tab['key']: $tab)) }}" role="tab"
                aria-controls="pills-{{ Str::snake(Str::ascii(is_array($tab) ? $tab['key']: $tab)) }}" aria-selected="true" wire:ignore>
                {{ __(is_array($tab) ? $tab['name'] : $tab) }}
            </a>
        </li>
        @endforeach
    </ul>

    <div class="tab-content" id="pills-tabContent-{{ $tabsId }}">
        @foreach ($tabs as $key => $tab)
        <div class="tab-pane {{ $key == 0 ? 'show active': '' }}" id="pills-{{ Str::snake(Str::ascii(is_array($tab) ? $tab['key']: $tab)) }}"
            role="tabpanel" aria-labelledby="pills-{{ Str::snake(Str::ascii(is_array($tab) ? $tab['key']: $tab)) }}-tab" wire:ignore.self>
            {{ ${Str::snake(Str::ascii(is_array($tab) ? $tab['key']: $tab))} ?? '' }}
        </div>
        @endforeach
    </div>

</div>