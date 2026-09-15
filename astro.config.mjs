// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

import sitemap from "@astrojs/sitemap";

import pagefind from "astro-pagefind";

// Logic for having the correct dates in the sitemap
import { eventDatesByPath } from "./scripts/event-dates.mjs";

const eventDates = eventDatesByPath();

// https://astro.build/config
export default defineConfig({
  site: "https://gpul.org",
  image: {
    layout: "constrained",
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mdx(),
    pagefind(),
    sitemap({
      serialize(item) {
        const eventDate = eventDates.get(new URL(item.url).pathname);

        return {
          ...item,
          ...(eventDate ? { lastmod: eventDate } : {}),
          links: [{ lang: "gl", url: item.url }],
        };
      },
    }),
  ],
  redirects: {
    "/school": "/eventos",
  },
});
