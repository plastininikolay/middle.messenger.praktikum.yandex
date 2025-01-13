import {resolve} from 'path';
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, './src/partials'),
    }),
    ],
    build: {
        outDir: 'dist',
    },
    server: {
        port: 3000,
    },
})
