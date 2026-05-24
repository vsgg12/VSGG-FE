import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Script from 'next/script';
import { Suspense } from 'react';
import RQProvider from '@/components/RQProvider';
import { Toaster } from 'react-hot-toast';
import GlobalLoginModalLayer from '@/components/common/GlobalLoginModalLayer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '리그 오브 레전드(LoL) 과실 판결 커뮤니티 VS.GG',
  description:
    '라이엇도 안심하는 리그오브레전드 과실 판결 커뮤니티 VS.GG, LCK부터 내 플레이까지 모두 가능! 간단한 챔피언, 포지션, 티어 정보만 입력하세요. 과실을 판결하고 플레이어들과 토론하며 롤을 더 재밌게 즐겨요',
  keywords:
    'LCK, 라이엇, 롤문철, 라이엇도 안심하는, 과실 판결, 리플레이 영상 공유, 게임 커뮤니티 플랫폼, 챔피언, 포지션, 티어, 토론, 롤 관련 커뮤니티, 롤, 커뮤니티',
  metadataBase: new URL('https://vsgg.co.kr'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'r1opwB8ilF7fEuqvQ6Flfu9WHhshGXeABmREKa02zyQ',
    other: {
      'naver-site-verification': '6f47895aa61798532c99334cbb3786cb9e28a25e',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    Yeti: 'index, follow', // 네이버 검색 로봇 허용
    Daumoa: 'index, follow', // 다음 검색 로봇 허용
  },
  // [오픈그래프 영역] 카카오톡 등 외부 링크 공유 시 보여지는 정보
  openGraph: {
    title: '리그 오브 레전드(LoL) 과실 판결 커뮤니티 VS.GG',
    description:
      '라이엇도 안심하는 리그오브레전드 과실 판결 커뮤니티 VS.GG, LCK부터 내 플레이까지 모두 가능! 간단한 챔피언, 포지션, 티어 정보만 입력하세요. 과실을 판결하고 플레이어들과 토론하며 롤을 더 재밌게 즐겨요',
    url: 'https://vsgg.co.kr',
    siteName: '리그 오브 레전드(LoL) 과실 판결 커뮤니티 VS.GG',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/logo/openGraph/og-image.png', // 카톡링크미리보기 이미지 적용
        width: 800,
        height: 420,
        alt: 'VS.GG OpenGraph Image',
      },
    ],
  },
  // [파비콘 영역] 탭 아이콘 및 검색 엔진 노출 아이콘
  icons: {
    icon: [
      // 2. 브라우저 탭 파비콘 (라이트모드)
      { url: '/logo/favicon/favicon-light.png', media: '(prefers-color-scheme: light)' },

      // 3. 브라우저 탭 파비콘 (다크모드)
      { url: '/logo/favicon/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    // Safari 브라우저에서 [홈 화면에 추가] 버튼을 눌러 웹사이트를 앱처럼 바탕화면에 꺼내둘 때 사용되는 '앱 아이콘'
    // 애플 공식 가이드라인에서도 배경이 투명하지 않고 꽉 채워진(Opaque) 고해상도(보통 180x180)의 단일 이미지를 하나만 제공하도록 권장
    apple: [{ url: '/logo/favicon/favicon-dark.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko' className='root-bg'>
      <head>
        <Script defer src='https://cdn.swygbro.com/public/widget/swyg-widget.js'></Script>

        {/* Google tag (gtag.js) */}
        <Script async src='https://www.googletagmanager.com/gtag/js?id=G-MYFHS8HYQ5'></Script>
        <Script
          id='google-analytics'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MYFHS8HYQ5');
            `,
          }}
        ></Script>
      </head>
      <body className={inter.className}>
        <RQProvider>
          <Suspense>
            <GlobalLoginModalLayer />
            <Toaster
              position='bottom-right'
              toastOptions={{
                duration: 3000,
                style: {
                  width: 'fit-content',
                  height: '56px',
                  fontSize: '16px',
                  paddingLeft: '20px',
                  paddingRight: '80px',
                  background: '#222222',
                  color: 'white',
                },
              }}
            />
            <div style={{ display: 'flex', minHeight: '100vh' }}>
              <main style={{ flex: 1 }}>
                <Suspense>{children}</Suspense>
              </main>
            </div>
          </Suspense>
        </RQProvider>
      </body>
    </html>
  );
}
