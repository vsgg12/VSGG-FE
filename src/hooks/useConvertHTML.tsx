'use client';

import { useEffect, useState } from 'react';

export default function useConvertHTML(content: string) {
  const [pTagsContent, setPTagsContent] = useState<string[]>([]);
  const [imgTagsContent, setImgTagsContent] = useState<string[]>([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    // <p> 태그 안의 텍스트 내용 추출
    const pTagsArray = Array.from(doc.querySelectorAll('p')).map((p) => p.textContent || '');

    // <img> 태그의 src 속성 추출
    const imgTagsArray = Array.from(doc.querySelectorAll('img')).map((img) => img.src);

    setPTagsContent(pTagsArray);
    setImgTagsContent(imgTagsArray);
  }, [content]);

  return { pTags: pTagsContent, imgTags: imgTagsContent };
}
