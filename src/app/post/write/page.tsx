'use client';

import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';
import { useEffect } from 'react';

export default function PostWrite() {
  const { isLogin } = useAuthStore();
  const { isNotificationOpen, isSearchOpen, setRouteState } = useSidebarStore();
  useBodyScrollLock(isNotificationOpen || isSearchOpen);

  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace('/');
    } else {
      router.replace('/post/selectUpload');
    }
  }, [isLogin, router]);

  useEffect(() => {
    setRouteState('WRITE');
  }, [setRouteState]);
}
