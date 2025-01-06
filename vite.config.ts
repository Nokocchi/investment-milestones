import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/investment-milestones/',
  plugins: [svelte(), Icons({ compiler: 'svelte'})],
})
