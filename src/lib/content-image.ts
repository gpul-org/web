import type { ImageMetadata } from "astro";

const contentImages = import.meta.glob(
  "../assets/{eventos,novas}/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, ImageMetadata>;

type ContentType = "eventos" | "novas";

export function getContentImage(
  type: ContentType,
  id: string,
): ImageMetadata | undefined {
  const name = id.split("/").pop();
  const imageBases = [
    `../assets/${type}/${id}`,
    `../assets/${type}/${id}/${name}`,
  ];
  const imagePath = Object.keys(contentImages).find((path) =>
    imageBases.includes(path.replace(/\.[^/.]+$/, "")),
  );

  return imagePath ? contentImages[imagePath] : undefined;
}
