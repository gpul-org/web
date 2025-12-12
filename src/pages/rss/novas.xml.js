import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const novas = await getCollection("novas");

  return rss({
    title: "RSS de novas do GPUL",
    description:
      "Toda a actualidade sobre o Grupo de Programadores e Usuarios de Linux",
    site: context.site,
    items: novas.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/novas/${post.id}/`,
    })),
  });
}
