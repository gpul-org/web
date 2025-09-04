import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';


const events = defineCollection ({
  loader: glob({ pattern: '*.md', base: './src/content/events'}),
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    location: z.string(),
    tags: z.array(z.string()),
    status: z.string()
  })
});


export const collections = { events };
