import type { ImageMetadata } from "astro";
import { getCollection } from "astro:content";

import type { Nova as ContentNova } from "./nova";
import { getContentImage } from "../lib/content-image";

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
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
);

export const novaTags = [...new Set(novas.flatMap((nova) => nova.data.tags))];
