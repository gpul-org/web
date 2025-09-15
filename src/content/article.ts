
import { getCollection, type CollectionEntry } from 'astro:content';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const definition = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news'}),
  schema : z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
  })
});

export type Article = CollectionEntry<'news'>;

export const articles = (await getCollection('news')).toSorted(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
