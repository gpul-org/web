import { type CollectionEntry, defineCollection } from "astro:content"
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

export const definition = defineCollection({
  loader: file('./src/content/directive.yaml'),
  schema: z.object({
    role: z.string(),
    bio: z.string(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  })
});

export type Directive = CollectionEntry<'directiva'>;
