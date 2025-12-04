
import { getCollection, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

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

export const novas = (await getCollection('novas'))
  .toSorted((a, b) => b.data.date.getTime() - a.data.date.getTime()) as Nova[];

export const novaTags = [...new Set(novas.flatMap(nova => nova.data.tags))]
