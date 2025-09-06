import { glob, file } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const events = defineCollection({
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

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news'}),
  schema : z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.date(),
    author: z.string(),
    tags: z.array(z.string()),
  })
});

const directive = defineCollection({
  loader: file('./src/content/directive.yaml'),
  schema: z.object({
    role: z.string(),
    bio: z.string(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
  })
});

const history = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/history'}),
});


export const collections = { events, news, directive, history };
