const mix = require("laravel-mix");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

require("laravel-mix-clean");
require("laravel-mix-versionhash");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("assets/app.jsx", "")
    .js("assets/admin.js", "")
    .js("assets/modules/livewire-frame.js", "")
    .preact()
    .sass("assets/style.scss", "")
    .setPublicPath("public/assets/")
    .setResourceRoot("/assets/")
    .options({
        terser: {
            extractComments: false,
        },
    })
    .webpackConfig({
        plugins: [
            // new InjectManifest({
            //     swSrc: './assets/service-worker.js',
            //     swDest: '../sw.js',
            //     maximumFileSizeToCacheInBytes: 1000000 * 3,
            //     excludeChunks: [
            //         '/admin', '/livewire-frame', 'slim-select', 'editorjs', 'filepond',
            //         "placesjs", "admin-event-create", "admin-event-show", "admin-gallery",
            //         "admin-sermon-edit", "admin-settings-church-details", "admin-settings-programmes",
            //         "pswp", "registration-event", "share-api-polyfill"
            //     ]
            // })
        ],
        resolve: {
            alias: {
                "/@": path.resolve(__dirname, "assets/"),
                react: "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
            },
        },
        output: {
            publicPath: "/assets/",
        },
    })
    .extract([
        "preact",
        "@inertiajs/inertia",
        "@inertiajs/inertia-react",
        "@inertiajs/progress",
    ])
    .sourceMaps(false)
    .disableNotifications()
    .clean()
    .versionHash({ length: 16 });
