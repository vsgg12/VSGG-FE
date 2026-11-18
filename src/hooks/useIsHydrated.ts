'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

/**
 * 서버 렌더링 / hydration 중에는 false, 그 이후 클라이언트 렌더링에서는 true를 반환
 * - localStorage에 persist된 zustand 값(로그인 여부, 다크모드 등)은 서버에서 알 수 없어
 *   그대로 렌더링하면 서버 HTML과 달라져 hydration mismatch가 발생함
 * - 이 값이 false인 동안에는 persist 값 대신 서버와 같은 기본값으로 렌더링하면 됨
 * - 클라이언트 라우팅으로 나중에 마운트되는 컴포넌트는 처음부터 true라 깜빡임이 없음
 */
export default function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
