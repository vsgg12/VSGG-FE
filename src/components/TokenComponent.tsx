// src/app/ClientComponent.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TokenComponent() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (document.cookie.includes('authExpired=true')) {
        router.push('/auth/signIn');
        document.cookie =
          'authExpired=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      }
    };

    const handlePopState = () => {
      handleRouteChange();
    };

    // 페이지 이동 시 확인
    const originalPush = router.push;

    router.push = async (href: string) => {
      handleRouteChange();
      await originalPush(href);
    };

    // 뒤로가기 이벤트 리스너 설정
    window.addEventListener('popstate', handlePopState);

    return () => {
      router.push = originalPush;
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router]);

  return null;
}
