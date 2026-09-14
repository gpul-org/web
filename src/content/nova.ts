
import { type CollectionEntry, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

export const definition = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/novas'}),
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    image: image().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()),
  })
});


export type Nova = CollectionEntry<'novas'>;
