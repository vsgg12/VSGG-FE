import { Inter } from 'next/font/google';
import './globals.css';
// import 'react-quill/dist/quill.snow.css';
import Script from 'next/script';
import { Suspense } from 'react';
import RQProvider from '@/components/RQProvider';

const inter = Inter({ subsets: ['latin'] });
export const metadata = {
  title: '롤 과실 판결 커뮤니티 VS.GG - 롤 플레이 영상을 공유하고 과실을 판결하세요.',
  description:
    '라이엇도 안심하는 리그오브레전드 과실 판결은 VS.GG, VSGG는 게임 플레이 영상을 공유하고 과실 판결할 수 있는 소환사를 위한 게임 커뮤니티 플랫폼입니다. LCK부터 내 플레이까지 모두 가능! 간단한 챔피언, 포지션, 티어 정보만 입력하세요. 과실을 판결하고 플레이어들과 토론하며 롤을 더 재밌게 즐길 수 있습니다.',
  keywords: 'LCK, 라이엇, 롤문철, 라이엇도 안심하는, 과실 판결, 리플레이 영상 공유, 게임 커뮤니티 플랫폼, 챔피언, 포지션, 티어, 토론',
  openGraph: {
    title: '롤 과실 판결 커뮤니티 VS.GG - 롤 플레이 영상을 공유하고 과실을 판결하세요.',
    description:
      '라이엇도 안심하는 리그오브레전드 과실 판결은 VS.GG, VSGG는 게임 플레이 영상을 공유하고 과실 판결할 수 있는 소환사를 위한 게임 커뮤니티 플랫폼입니다. LCK부터 내 플레이까지 모두 가능! 간단한 챔피언, 포지션, 티어 정보만 입력하세요. 과실을 판결하고 플레이어들과 토론하며 롤을 더 재밌게 즐길 수 있습니다.',
    images: [
      {
        url: '/image/vsgg.png',
      },
    ],
    siteName: '롤 과실 판결 커뮤니티 VS.GG - 롤 플레이 영상을 공유하고 과실을 판결하세요.',
    type: 'website',
  },
  icons: {
    icon: '/image/vsgg.png',
  },
  metadataBase: new URL('https://vsgg.co.kr'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className='root-bg'>
      <head>
        <meta name='naver-site-verification' content='6f47895aa61798532c99334cbb3786cb9e28a25e' />
        <meta
          name='title'
          content='롤 과실 판결 커뮤니티 VS.GG - 롤 플레이 영상을 공유하고 과실을 판결하세요.'
        />
        <link rel='stylesheet' href='https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css' />
        <link rel='icon' href='/image/vsgg.png' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/image/vsgg.png' type='image/png' sizes='32x32' />
        <Script defer src='https://cdn.swygbro.com/public/widget/swyg-widget.js'></Script>
      </head>
      <body className={inter.className}>
        <RQProvider>
          <Suspense>{children}</Suspense>
        </RQProvider>
      </body>
    </html>
  );
}
