import { NextResponse } from 'next/server';

function generateSiteMap(posts: IGetPostDTOType[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>http://localhost:3000</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
      ${posts
        .map((post) => {
          return `
            <url>
              <loc>http://localhost:3000/post/${post.id}</loc>
              <lastmod>${new Date(post.updatedAt).toISOString()}</lastmod>
              <priority>0.8</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
}

function SiteMap() {
  
}

export async function getServerSideProps({res}: {res:any}) {
  try {
    const request = await fetch(`${process.env.NEXT_PUBLIC_PROXY_URL}`);
    if (!request.ok) {
      throw new Error(`Failed to fetch posts: ${request.statusText}`);
    }

    const posts: IGetPostDTOType[] = await request.json();
    console.log('Fetched posts:', posts);

    const sitemap = generateSiteMap(posts);
    console.log('Generated Sitemap:', sitemap);

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
