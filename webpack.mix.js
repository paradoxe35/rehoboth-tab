const mix = require('laravel-mix')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

require('laravel-mix-clean');
require('laravel-mix-versionhash')
// require('laravel-mix-imagemin');

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

mix.react('assets/App.jsx', 'main.js')
    .react('assets/Admin.js', 'admin.js')
    .js("assets/modules/livewire-frame.js", "livewire-frame.js")
    .setPublicPath('public/assets/')
    .setResourceRoot('/assets/')
    // .imagemin('public/assets/images/*')
    .options({
        terser: {
            extractComments: false,
        }
    })
    .webpackConfig({
        optimization: {
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: 'main-style',
                        test: /\.scss$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
        plugins: [
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
            ],
        },
        resolve: {
            alias: {
                "/@": path.resolve(__dirname, 'assets/'),
                "react": "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
            },
        },
        output: {
            publicPath: '/assets/',
        }
    })
    .extract([
        "preact",
        "@popperjs/core",
        "@inertiajs/inertia",
        "@inertiajs/inertia-react",
        "@inertiajs/progress",
    ])
    .version()
    .sourceMaps(false)
    .clean()
    .disableNotifications()
    .versionHash({
        length: 8
    })