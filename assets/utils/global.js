//@ts-nocheck

export default () => {
    window.swupReload = (top = true) => {
        if (top) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }
        $swup.loadPage({
            url: window.location.pathname + window.location.search
        }, true)
    }
    $swup.on('contentReplaced', () => livewire.start())

    window.addEventListener('routeFromChild', (e) => {
        $swup.loadPage({ url: e.detail })
    })
}