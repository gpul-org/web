
import { type CollectionEntry, getCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const definition = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/eventos'}),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    location: z.string(),
    tags: z.array(z.string()),
    status: z.string()
  })
});

export type Event = CollectionEntry<'eventos'>;
export const events: Event[] = await getCollection('eventos')

// MAYBE should create a enum for event.status
export const upcomingEvents = events.filter(
  ({ data }) => data.status === "upcoming"
)
export const pastEvents = events.filter(
  ({ data }) => data.status !== "upcoming"
)
