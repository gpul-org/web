import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

import { definition as eventos, authors_definition as authors } from './event';
import { definition as novas} from './nova'; 
import { definition as directiva } from './directive'; 

// const history = defineCollection({
//   loader: glob({ pattern: '*.md', base: './src/content/history'}),
// });


export const collections = { eventos, novas, directiva, authors, /*history*/ };
