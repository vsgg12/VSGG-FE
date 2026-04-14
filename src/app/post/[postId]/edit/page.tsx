'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';

/* 수정 가능 항목
    1.제목
    2. 본문 내용
    3. 해시태그(삭제 및 추가 가능
    4. 동영상(기존 동영상 삭제 후 새로운 영상 첨부 가능
    5. 이미지(기존 이미지 삭제 후 새로운 이미지 첨부 가능
    6. 챔피언 티어 수정 가능
*/
function EditPost() {
  const { isLogin } = useAuthStore();
  const { isNotificationOpen, isSearchOpen, setRouteState } = useSidebarStore();
  useBodyScrollLock(isNotificationOpen || isSearchOpen);

  useEffect(() => {
    setRouteState('HOME');
  }, [setRouteState]);

  const router = useRouter();
  if (!isLogin) {
    router.replace('/');
  }

  return <div></div>;
}

export default EditPost;
