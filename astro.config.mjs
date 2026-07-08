// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// Statisk først (PRD): alle sider prerendres; kun /api/* og GitHub-henting
// opter inn i on-demand rendering med `export const prerender = false`.
// React brukes KUN til spill-øya («Skamløs pitch», client:only).
export default defineConfig({
  site: 'https://stianglomsrod.no',
  output: 'static',
  adapter: vercel(),
  integrations: [react()],
});
