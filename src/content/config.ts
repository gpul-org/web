import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { definition as events } from './event';
import { definition as news } from './article'; 
import { definition as directive } from './directive'; 

const history = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/history'}),
});


export const collections = { events, news, directive, history };
