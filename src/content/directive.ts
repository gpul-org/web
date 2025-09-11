import { getCollection, type CollectionEntry } from "astro:content"


export type Directive = CollectionEntry<'directive'>;
export const directive = await getCollection('directive')
