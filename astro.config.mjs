import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  output: 'server'  // 👈 THIS IS CRITICAL — must be 'server', not 'static'
});
