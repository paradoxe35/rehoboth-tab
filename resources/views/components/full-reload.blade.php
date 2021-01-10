<div id="{{ Str::random() }}">
    <script type="text/javascript" id="{{ Str::random() }}">
        window.setTimeout(() => {
            if(window.swupReload) {
                window.swupReload(false)
            }else {
                window.location.reload()
            }
        }, 3000)
    </script>
</div>