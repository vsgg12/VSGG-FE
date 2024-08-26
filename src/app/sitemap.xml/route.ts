import { NextResponse } from 'next/server';

function generateSiteMap(posts: IGetPostDTOType[], baseUrl: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${posts
        .map((post) => {
          return `
            <url>
              <loc>${baseUrl}/post/${post.id}</loc>
              <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
}

export async function GET() {
  try {
    const baseUrl =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://vsgg.co.kr';
    // API 호출로 데이터를 가져옵니다.
    const request = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}/post?orderby=&keyword=`);
    if (!request.ok) {
      throw new Error(`Failed to fetch posts: ${request.statusText}`);
    }
    const posts: IGetPostListType = await request.json();
    // 사이트맵 XML을 생성합니다.
    const sitemap = generateSiteMap(posts.postDTO, baseUrl);
    // XML을 반환합니다.
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
