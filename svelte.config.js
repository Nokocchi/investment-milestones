import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { sveltePreprocess, typescript } from 'svelte-preprocess'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  //preprocess: sveltePreprocess({typescript: true}),
  preprocess: vitePreprocess({script: true}),
}
