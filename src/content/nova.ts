import type { ImageMetadata } from "astro";
import {
	getCollection,
	type CollectionEntry,
	defineCollection,
} from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { getContentImage } from "../lib/content-image";

export const definition = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/novas" }),
	schema: z.object({
		title: z.string(),
		excerpt: z.string(),
		date: z.coerce.date(),
		author: z.string().optional(),
		tags: z.array(z.string()),
	}),
});

type ContentNova = CollectionEntry<"novas">;

export type Nova = Omit<ContentNova, "data"> & {
	data: ContentNova["data"] & { image?: ImageMetadata };
};

export async function getNovas(): Promise<Nova[]> {
	const novas = await getCollection("novas");

	return novas.map((nova) => ({
		...nova,
		data: {
			...nova.data,
			image: getContentImage("novas", nova.id),
		},
	}));
}

export const novas = (await getNovas()).toSorted(
	(a, b) => b.data.date.getTime() - a.data.date.getTime(),
);

export const novaTags = [...new Set(novas.flatMap((nova) => nova.data.tags))];
