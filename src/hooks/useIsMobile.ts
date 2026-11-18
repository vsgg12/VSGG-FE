'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

// 서버에서는 useLayoutEffect 경고가 나므로 브라우저에서만 useLayoutEffect 사용
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * 모바일(767px 이하) 여부
 * - 첫 렌더링은 initial 값(서버에서 User-Agent로 판단한 값)을 사용해 서버 HTML과 일치시킴
 * - 마운트 직후(페인트 전) 실제 화면 크기로 보정하고, 이후 창 크기 변경도 반영
 */
export default function useIsMobile(initial = false) {
  const [isMobile, setIsMobile] = useState<boolean>(initial);

  useIsomorphicLayoutEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isMobile;
}
