import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const eventos = await getCollection("eventos");

  return rss({
    title: "RSS de eventos de GPUL",
    description:
      "Información sobre os próximos eventos do Grupo de Programadores e Usuarios de Linux",
    site: context.site,
    items: eventos.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/eventos/${post.id}/`,
    })),
  });
}
