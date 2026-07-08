// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// Statisk først (PRD): alle sider prerendres; kun /api/* og GitHub-henting
// opter inn i on-demand rendering med `export const prerender = false`.
export default defineConfig({
  site: 'https://stianglomsrod.no',
  output: 'static',
  adapter: vercel(),
});
