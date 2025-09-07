
import { type CollectionEntry, getCollection } from 'astro:content';

export type Event = CollectionEntry<'events'>;
export const events: Event[] = await getCollection('events')

// MAYBE should create a enum for event.status
export const upcomingEvents = events.filter(
  ({ data }) => data.status === "upcoming"
)
export const pastEvents = events.filter(
  ({ data }) => data.status !== "upcoming"
)
