import './style.scss'

import "./utils/devtool"
import { App as InertiaApp } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import { InertiaProgress } from '@inertiajs/progress'
import Layout from './layouts/Layout'
import Application from './layouts/Application'
import { i18nReactInit } from './i18n/i18n'



i18nReactInit(document.querySelector('html').lang || 'fr')

InertiaProgress.init({
  color: 'var(--bs-primary)',
})

const el = document.getElementById('app')

const resolveComponent = name => {
  return import(`./pages/${name}.jsx`)
    .then(({ default: page }) => {

      page.layout = page.layout === undefined ? (c) => <Layout children={c} /> : page.layout

      return page
    })
}

const Main = () => (
  <Application>
    {/* @ts-ignore */}
    <InertiaApp
      initialPage={JSON.parse(el.dataset.page)}
      resolveComponent={resolveComponent} />
  </Application>
)

render(<Main />, el)