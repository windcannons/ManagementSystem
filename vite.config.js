import {
    fileURLToPath,
    URL
} from 'node:url'

import {
    defineConfig
} from 'vite'
import vue
    from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            host: "localhost",
            port: "5173",
            open: "true",
            https: "true",
            cors: "true",
            "/api": {
                target: "http://8.130.28.129:9090",
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        },
    },
})
