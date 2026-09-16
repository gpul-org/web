import { file, glob } from "astro/loaders";
import {
	getCollection,
	type CollectionEntry,
	defineCollection,
	reference,
} from "astro:content";
import { z } from "astro/zod";
import type { ImageMetadata } from "astro";
import { getContentImage } from "../lib/content-image";

export const definition = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/eventos" }),
	schema: z.object({
		title: z.string(),
		excerpt: z.string(),
		date: z.coerce.date(),
		location: z.string(),
		tags: z.array(z.string()),
		status: z.string(),
		authors: z.array(reference("authors")).optional(),
		video: z.string().optional(),
	}),
});

export const authorsDefinition = defineCollection({
	loader: file("./src/content/authors.json"),
	schema: z.object({
		id: z.string(),
		name: z.string(),
		portfolio: z.url().optional(),
	}),
});

type ContentEvent = CollectionEntry<"eventos">;

export type Event = Omit<ContentEvent, "data"> & {
	data: ContentEvent["data"] & { image: ImageMetadata };
};

export async function getEvents(): Promise<Event[]> {
	const events = await getCollection("eventos");

	return events.map((event) => {
		const image = getContentImage("eventos", event.id);

		if (!image) {
			throw new Error(
				`No se encontró la imagen del evento "${event.id}". Debe llamarse igual que su archivo Markdown.`,
			);
		}

		return {
			...event,
			data: {
				...event.data,
				image,
			},
		};
	});
}

enum EventStatus {
	Upcoming = "upcoming",
	Past = "past",
}

const events: Event[] = (await getEvents()).toSorted(
	(a, b) => b.data.date.getTime() - a.data.date.getTime(),
);

export const upcomingEvents = events
	.filter(({ data }) => data.status === EventStatus.Upcoming)
	.toSorted((a, b) => a.data.date.getTime() - b.data.date.getTime());

export const pastEvents = events.filter(
	({ data }) => data.status === EventStatus.Past,
);
