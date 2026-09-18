export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export interface JsonLd {
  [key: string]: JsonLdValue;
}

export function canonicalUrl(path: string | URL, siteUrl: URL): URL {
  const url = new URL(path, siteUrl);

  if (url.origin === siteUrl.origin && !url.pathname.endsWith("/")) {
    url.pathname += "/";
  }

  return url;
}

export function absoluteUrl(path: string, siteUrl: URL): string {
  return canonicalUrl(path, siteUrl).href;
}

export function breadcrumbListSchema(
  items: BreadcrumbItem[],
  siteUrl: URL,
  pageUrl: URL,
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl.href}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const listItem: JsonLd = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };

      if (item.href) {
        listItem.item = absoluteUrl(item.href, siteUrl);
      }

      return listItem;
    }),
  };
}
