import "./utils/polyfill"
import "./utils/devtool"
// @ts-ignore
import { App as InertiaApp } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import React, { useEffect } from 'react'
import { render } from 'react-dom'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './layouts/Layout'
import Application from './layouts/Application'
import registerServiceWorker from './worker/registerServiceWorker'
import registerSwPushManager from './worker/registerSwPushManager'

InertiaProgress.init({
    color: 'var(--bs-secondary)',
})

const el = document.getElementById('app')

const resolveComponent = name => {

    return import(`./pages/${name}.jsx`)
        .then(({ default: page }) => {

            page.layout = page.layout === undefined ? (c) => <Layout children={c} /> : page.layout

            return page
        })
}

const Main = () => {
    useEffect(() => {
        Inertia.on('success', () =>
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        )
    }, [])

    return <Application>
        {/* @ts-ignore */}
        <InertiaApp
            initialPage={JSON.parse(el.dataset.page)}
            resolveComponent={resolveComponent} />
    </Application>
}

render(<Main />, el)

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    registerServiceWorker()
    registerSwPushManager()
}
