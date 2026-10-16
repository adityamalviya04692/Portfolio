import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base must match the GitHub Pages project path: /Aditya_Malviya-Portfolio/
export default defineConfig({
    plugins: [react()],
    base: '/Aditya_Malviya-Portfolio/',
})
