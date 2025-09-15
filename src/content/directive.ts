import { getCollection, type CollectionEntry } from "astro:content"
import { file } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

export const definition = defineCollection({
  loader: file('./src/content/directive.yaml'),
  schema: z.object({
    role: z.string(),
    bio: z.string(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  })
});

export type Directive = CollectionEntry<'directive'>;
export const directive = await getCollection('directive')
