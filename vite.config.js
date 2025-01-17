import {resolve} from 'path';
import {defineConfig} from 'vite'
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
    base: './',
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, './src/partials'),
    }),
    ],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                404: resolve(__dirname, 'src/pages/404.html'),
                500: resolve(__dirname, 'src/pages/500.html'),
                auth: resolve(__dirname, 'src/pages/auth.html'),
                chats: resolve(__dirname, 'src/pages/chats.html'),
                profile: resolve(__dirname, 'src/pages/profile.html'),
                profileEdit: resolve(__dirname, 'src/pages/profile-edit.html'),
                registration: resolve(__dirname, 'src/pages/registration.html'),
            },
        },
    },
    server: {
        port: 3000,
    },
})
