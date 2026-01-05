import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless'; // 👈 Add this

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel() // 👈 Enable Vercel serverless functions
});
