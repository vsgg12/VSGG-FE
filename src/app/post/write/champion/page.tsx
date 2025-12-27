'use client';

import { useState, useEffect } from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import { useRouter } from 'next/navigation';
import LeftContainer from '@/app/post/write/_component/common/LeftContainer';

function Champion() {
  const router = useRouter();

  const [activeBox, setActiveBox] = useState<null | 'video' | 'title' | 'content'>(null);
  const { videoId, uploadVideos, clearAll} = useWriteStore();

  useEffect(() => {
    /** 뒤로가기 감지 */
    const handlePopState = () => {
      const ok = confirm('페이지를 떠나면 작성된 내용이 사라집니다');
      if (!ok) {
        // 뒤로가기 취소
        history.pushState(null, '', location.href);
      }
      else {
        clearAll();
        router.replace('/post/selectUpload');
      }
    };

    /** 새로고침 / 탭 닫기 감지 */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      sessionStorage.setItem('WRITE_REFRESH', 'true');
      e.preventDefault();
    };

    // history stack 보호
    history.pushState(null, '', location.href);

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clearAll, router]);

  useEffect(() => {
    const isRefresh = sessionStorage.getItem('WRITE_REFRESH');

    if (isRefresh) {
      sessionStorage.removeItem('WRITE_REFRESH');
      clearAll();
      router.replace('/post/selectUpload');
    }
  }, [clearAll, router]);

  useEffect(() => {
    if(!uploadVideos && !videoId){
      router.replace('/post/selectUpload');
    }
  }, [router, uploadVideos, videoId]);

  return (
    <div
      className={'w-screen h-screen flex justify-center items-center gap-[20px]'}
    >
      <LeftContainer
        activeBox={activeBox}
        setActiveBox={setActiveBox}
      />
      <div className={'flex flex-col'}>Champion</div>
    </div>
  );
}

export default Champion;
