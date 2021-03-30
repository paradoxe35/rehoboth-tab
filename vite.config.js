import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact(),
    ],
    base: '/dev/',
    root: "./assets",
    resolve: {
        alias: {
            '/@': resolve(__dirname, 'assets/'),
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
        }
    }
})
