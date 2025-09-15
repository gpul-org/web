
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'news'>;

export const articles = (await getCollection('news')).toSorted(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);
