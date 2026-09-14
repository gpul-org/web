import { getCollection } from "astro:content";

import type { Nova } from "./nova";

export const novas = (await getCollection("novas")).toSorted(
  (a, b) => b.data.date.getTime() - a.data.date.getTime()
) as Nova[];

export const novaTags = [...new Set(novas.flatMap((nova) => nova.data.tags))];
