import { Inter } from 'next/font/google';
import './globals.css';
// import 'react-quill/dist/quill.snow.css';
import Script from 'next/script';
import { Suspense } from 'react';
import RQProvider from '@/components/RQProvider';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: '리그 오브 레전드(LOL) 과실 판결 커뮤니티 VS.GG',
  description:
    '라이엇도 안심하는 리그오브레전드 과실 판결 커뮤니티 VS.GG, LCK부터 내 플레이까지 모두 가능! 간단한 챔피언, 포지션, 티어 정보만 입력하세요. 과실을 판결하고 플레이어들과 토론하며 롤을 더 재밌게 즐겨요',
  keywords:
    'LCK, 라이엇, 롤문철, 라이엇도 안심하는, 과실 판결, 리플레이 영상 공유, 게임 커뮤니티 플랫폼, 챔피언, 포지션, 티어, 토론, 롤 관련 커뮤니티, 롤, 커뮤니티',
  openGraph: {
    title: '리그 오브 레전드(LOL) 과실 판결 커뮤니티 VS.GG',
    description:
      '라이엇도 안심하는 리그오브레전드 과실 판결 커뮤니티 VS.GG, LCK부터 내 플레이까지 모두 가능! 간단한 챔피언, 포지션, 티어 정보만 입력하세요. 과실을 판결하고 플레이어들과 토론하며 롤을 더 재밌게 즐겨요',
    images: [
      {
        url: '/svg/logo/CircleLogo.svg',
        width: 800,
        height: 400,
        
      },
    ],
    siteName: '리그 오브 레전드(LOL) 과실 판결 커뮤니티 VS.GG',
    type: 'website',
    url: 'https://vsgg.co.kr',
    locale: 'ko_KR',
  },
  icons: {
    icon: '/svg/logo/CircleLogo.svg',
  },
  metadataBase: new URL('https://vsgg.co.kr'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='root-bg'>
      <head>
        <meta name='naver-site-verification' content='6f47895aa61798532c99334cbb3786cb9e28a25e' />
        <meta
          name='google-site-verification'
          content='r1opwB8ilF7fEuqvQ6Flfu9WHhshGXeABmREKa02zyQ'
        />
        <meta name='Yeti' content='All' />
        <meta name='NaverBot' content='All' />
        <meta property='robots' content='All' />

        <meta name='title' content='리그 오브 레전드(LOL) 과실 판결 커뮤니티 VS.GG' />
        <meta name='Location' content='ko_KR' />

        <meta property='og:image' content='/svg/logo/SquareLogo.svg' />
        <meta property='og:image:width' content='800' />
        <meta property='og:image:height' content='400' />

        <link
          href='https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css'
          rel='stylesheet'
        />
        <link rel='canonical' href='https://vsgg.co.kr' />

        <link rel='icon' href='/svg/logo/SquareLogo.svg' type='image/svg+xml' sizes='any' />
        <link rel='icon' href='/svg/logo/SquareLogo.svg' sizes='192x192' type='image/png' />
        <link rel='icon' href='/svg/logo/SquareLogo.svg' sizes='128x128' type='image/png' />
        <link rel='apple-touch-icon' href='/svg/logo/SquareLogo.svg' sizes='180x180' />
        <link rel='apple-touch-icon' href='/svg/logo/SquareLogo.svg' sizes='152x152' />
        <link rel='apple-touch-icon' href='/svg/logo/SquareLogo.svg' sizes='167x167' />
        <link rel='apple-touch-icon' href='/svg/logo/SquareLogo.svg' sizes='120x120' />
        <link rel='apple-touch-icon' href='/svg/logo/SquareLogo.svg' sizes='76x76' />
        <link rel='mask-icon' href='/svg/logo/SquareLogo.svg' color='#8A1F21' />
        <link rel='shortcut icon' href='/svg/logo/SquareLogo.svg' type='image/svg+xml' />

        <Script defer src='https://cdn.swygbro.com/public/widget/swyg-widget.js'></Script>
        <Script src='https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js'></Script>
      </head>
      <body className={inter.className}>
        <RQProvider>
          <Suspense>{children}</Suspense>
        </RQProvider>
      </body>
    </html>
  );
}
