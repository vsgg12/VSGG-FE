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
        width: 1200,
        height: 630,
      },
    ],
    siteName: '리그 오브 레전드(LOL) 과실 판결 커뮤니티 VS.GG',
    type: 'website',
    url: 'https://vsgg.co.kr',
    locale: 'ko_KR'
  },
  icons: {
    icon: '/svg/logo/SquareLogo.svg',
  },
  metadataBase: new URL('https://vsgg.co.kr'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='root-bg'>
      <head>
        <meta name='naver-site-verification' content='6f47895aa61798532c99334cbb3786cb9e28a25e' />
        <meta name='title' content='리그 오브 레전드(LOL) 과실 판결 커뮤니티 VS.GG' />
        <meta name="Location" content="ko_KR"/>

        <meta property='og:image:kakao' content='/svg/logo/SquareLogo.svg' />
        <meta property='og:image:width:kakao' content='800' />
        <meta property='og:image:height:kakao' content='400' />

        <meta name='twitter:image' content='/svg/logo/SquareLogo.svg' />
        <meta name='twitter:image:width' content='1200' />
        <meta name='twitter:image:height' content='630' />

        <meta property='og:image:instagram' content='/svg/logo/SquareLogo.svg' />
        <meta property='og:image:width:instagram' content='320' />
        <meta property='og:image:height:instagram' content='320' />

        <meta property='og:image:facebook' content='/svg/logo/SquareLogo.svg' />
        <meta property='og:image:width:facebook' content='600' />
        <meta property='og:image:height:facebook' content='315' />

        <link
          href='https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css'
          rel='stylesheet'
        />
        <link rel='canonical' href='https://vsgg.co.kr' />
        <link rel='icon' href='/svg/logo/SquareLogo.svg' type='image/svg+xml' sizes='48x48' />
        <link
          rel='apple-touch-icon'
          href='/svg/logo/SquareLogo.svg'
          type='image/svg+xml'
          sizes='48x48'
        />
        <link
          rel='apple-touch-icon-precomposed'
          href='/svg/logo/SquareLogo.svg'
          type='image/svg+xml'
          sizes='48x48'
        />

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
