import { glob } from 'astro/loaders';
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

export const isUpcomingEvent = ({ data }) => data.status === "upcoming" 
export const isPastEvent = event => !isUpcomingEvent(event) 

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

export const isRecentNew = ({ data }) => {
  const recentTime = new Date();
  recentTime.setFullYear(recentTime.getFullYear() - 1);

  return data.date < recentTime;
} 


export const collections = { events, news };
