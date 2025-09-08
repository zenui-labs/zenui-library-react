import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/Components/Overview/SidebarContent/Content'),
            '@blocks': path.resolve(__dirname, 'src/Components/Overview/SidebarContent/Blocks'),
            '@animations': path.resolve(__dirname, 'src/Components/Overview/SidebarContent/Animations'),
            '@pages': path.resolve(__dirname, 'src/Pages'),
            '@utils': path.resolve(__dirname, 'src/Utils'),
            '@store': path.resolve(__dirname, 'src/Store/index.js'),
            '@shared': path.resolve(__dirname, 'src/Shared'),
            '@helpers': path.resolve(__dirname, 'src/Helpers'),
        }
    },
    commonjsOptions: {
        transformMixedEsModules: true,
    }
})
