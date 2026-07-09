// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Statisk først (PRD): alle sider prerendres; kun /api/* og GitHub-henting
// opter inn i on-demand rendering med `export const prerender = false`.
// React brukes KUN til spill-øya («Skamløs pitch», client:only).
export default defineConfig({
  site: 'https://stianglomsrod.no',
  output: 'static',
  adapter: vercel(),
  // Norsk på rot, engelsk under /en/ (egne slugger; tvilling-kartet bor i
  // src/lib/i18n.ts). hreflang settes per side i Base.astro.
  i18n: {
    defaultLocale: 'nb',
    locales: ['nb', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      // Spillruta er en fullskjermsapp, ikke en indekserbar side.
      filter: (side) => !side.includes('/sandbox/skamlos-pitch'),
    }),
  ],
});
