import { glob } from "astro/loaders";
import {
  type CollectionEntry,
  defineCollection,
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
    author: z.string().optional(),
  }),
});

enum EventStatus {
  Upcoming = "upcoming",
  Past = "past"
}

export type Event = CollectionEntry<"eventos">;
export const events: Event[] = (await getCollection("eventos"))
  .toSorted((a, b) => a.data.date.getTime() - b.data.date.getTime());

export const upcomingEvents = events.filter(
  ({ data }) => data.status === EventStatus.Upcoming
);
export const pastEvents = events.filter(
  ({ data }) => data.status === EventStatus.Past
);
