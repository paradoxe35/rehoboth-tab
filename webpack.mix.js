const mix = require('laravel-mix')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

require('laravel-mix-clean');
require('laravel-mix-versionhash')

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

mix.react('assets/App.jsx', 'app.js')
    .setPublicPath('public/assets/')
    .setResourceRoot('/assets/')
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
                        name: 'styles',
                        test: /\.(s)?css$/,
                        chunks: 'all',
                        enforce: true,
                    },
                },
            },
            minimizer: [
                new CssMinimizerPlugin(),
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
        plugins: [
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.(s)?css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
            ],
        },
        output: {
            publicPath: '/assets/',
        }
    })
    .extract()
    .version()
    .sourceMaps(false)
    .clean()
    .disableNotifications()
    .versionHash({
        length: 8
    })