'use client';

import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import useIsHydrated from '@/hooks/useIsHydrated';

/**
 * hydration mismatch 없이 다크모드 여부를 읽는 훅
 * - 서버는 localStorage를 볼 수 없어 항상 라이트모드로 렌더링하므로, hydration 중에는 false를 반환
 */
export default function useIsDarkMode() {
  const isHydrated = useIsHydrated();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);

  return isHydrated && isDarkMode;
}
