import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel'; // ✅ Correct: zonder '/serverless'

export default defineConfig({
  integrations: [tailwind()],
  output: 'server',
  adapter: vercel({ mode: 'serverless' }) // ✅ Zo kies je serverless mode
});

