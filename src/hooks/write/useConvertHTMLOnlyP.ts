'use client';

import { useEffect, useState } from 'react';

type ContentItem = { type: 'p'; value: string } | { type: 'img'; value: string };

export default function useConvertHTML(content: string) {
  const [items, setItems] = useState<ContentItem[]>([]);

  useEffect(() => {
    if (!content) {
      setItems([]);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const bodyNodes = Array.from(doc.body.childNodes);

    const parsed = bodyNodes
      .map((node) => {
        if (node.nodeName === 'P') {
          return {
            type: 'p',
            value: node.textContent ?? '',
          };
        }

        if (node.nodeName === 'IMG') {
          const img = node as HTMLImageElement;
          return {
            type: 'img',
            value: img.src,
          };
        }

        return null;
      })
      .filter(Boolean) as ContentItem[];

    setItems(parsed);
  }, [content]);

  return items;
}
