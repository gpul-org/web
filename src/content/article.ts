
import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'news'>;

export const articles = await getCollection('news');

const NEWS_TO_SHOW = 2;
export const recentArticles = articles.slice(0, NEWS_TO_SHOW);
