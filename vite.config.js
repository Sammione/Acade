import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'pages/about.html'),
                courses: resolve(__dirname, 'pages/courses.html'),
                pathfinder: resolve(__dirname, 'pages/pathfinder.html'),
                playground: resolve(__dirname, 'pages/playground.html'),
            },
        },
    },
})
