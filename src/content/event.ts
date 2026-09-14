import { file, glob } from "astro/loaders";
import {
  type CollectionEntry,
  defineCollection,
  reference,
} from "astro:content";
import { z } from "astro/zod";

export const definition = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/eventos" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    location: z.string(),
    tags: z.array(z.string()),
    status: z.string(),
    authors: z.array(reference("authors")).optional(),
    video: z.string().optional(),
  }),
});

export const authors_definition = defineCollection({
  loader: file("./src/content/authors.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    portfolio: z.url().optional(),
  }),
});

export type Event = CollectionEntry<"eventos">;
