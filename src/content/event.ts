import { glob, file } from "astro/loaders";
import {
  type CollectionEntry,
  defineCollection,
  reference,
  getCollection,
  z,
} from "astro:content";

export const definition = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/eventos" }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    location: z.string(),
    tags: z.array(z.string()),
    status: z.string(),
    authors: z.array(reference('authors')).optional(),
  }),
});

export const authors_definition = defineCollection({
  loader: file('./src/content/authors.json'),
  schema: z.object({
    id: z.string(),
    portfolio: z.string().url(),
  })
});

export type Event = CollectionEntry<"eventos">;
export const events: Event[] = (await getCollection("eventos"))
  .toSorted((a, b) => a.data.date.getTime() - b.data.date.getTime());
// MAYBE should create a enum for event.status
export const upcomingEvents = events.filter(
  ({ data }) => data.status === "upcoming"
);
export const pastEvents = events.filter(
  ({ data }) => data.status !== "upcoming"
);
