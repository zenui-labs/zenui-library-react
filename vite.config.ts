import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import netlify from "@netlify/vite-plugin";
import path from 'path'

export default defineConfig({
    // The project has no Netlify edge functions or database, so skip those local emulators;
    // the edge functions one needs a Deno server and stops `vite dev` when it can't start.
    plugins: [react(), netlify({edgeFunctions: {enabled: false}, database: {enabled: false}})],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/Components/Overview/SidebarContent/Content'),
            '@blocks': path.resolve(__dirname, 'src/Components/Overview/SidebarContent/Blocks'),
            '@animations': path.resolve(__dirname, 'src/Components/Overview/SidebarContent/Animations'),
            '@pages': path.resolve(__dirname, 'src/Pages'),
            '@utils': path.resolve(__dirname, 'src/Utils'),
            '@store': path.resolve(__dirname, 'src/Store'),
            '@shared': path.resolve(__dirname, 'src/Shared'),
            '@helpers': path.resolve(__dirname, 'src/Helpers'),
        }
    }
})
