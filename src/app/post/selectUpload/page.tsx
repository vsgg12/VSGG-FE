'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SelectUploadMethod from './_component/SelectUploadMethod';
import UploadFile from './_component/UploadFile';
import UploadLink from './_component/UploadLink';
import LoadingFull from '@/components/LoadingFull';
import { useWriteStore } from '@/store/write/useWriteStore';
import { SelectCategory } from './_component/SelectCategory';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

function SelectUpload() {
  const router = useRouter();
  const {
    selectedMethod,
    isLoading,
    isSelectCategoryScreenShow,
    setData,
    clearAll,
    setPostAddRequest,
  } = useWriteStore();
  const { isLogin } = useAuthStore();
  const { route, setRouteState } = useSidebarStore();

  const onClickJudgeFault = () => {
    setPostAddRequest('category', 'FAULT');
    router.push('/post/write/fault');
  };

  const onClickJudgeChampion = () => {
    setPostAddRequest('category', 'CHAMPION');
    router.push('/post/write/champion');
  };

  const onClickUploadFileBtn = () => {
    setData('selectedMethod', '파일 첨부');
  };

  const onClickUploadLinkBtn = () => {
    setData('selectedMethod', '유튜브 링크');
  };

  useEffect(() => {
    if (!isLogin || route !== 'WRITE') {
      router.replace('/');
    }
  }, [isLogin, router, route]);

  useEffect(() => {
    setRouteState('WRITE');
  }, [setRouteState]);

  useEffect(() => {
    /** 뒤로가기 감지 */
    const handlePopState = () => {
      const ok = confirm('페이지를 떠나면 작성된 내용이 사라집니다');
      if (!ok) {
        // 뒤로가기 취소
        history.pushState(null, '', location.href);
      } else {
        clearAll();
        router.back();
      }
    };

    /** 새로고침 / 탭 닫기 감지 */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
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

  if (!isLogin) return null;

  return (
    <div className='w-full h-screen flex justify-center bg-white'>
      {isLoading ? (
        <LoadingFull />
      ) : (
        <div className='w-[545px] h-full flex flex-col justify-center items-center gap-[50px] text-center py-[36px]'>
          {isSelectCategoryScreenShow ? (
            <SelectCategory
              onClickJudgeFault={onClickJudgeFault}
              onClickJudgeChampion={onClickJudgeChampion}
            />
          ) : selectedMethod === null ? (
            <SelectUploadMethod
              onClickUploadFileBtn={onClickUploadFileBtn}
              onClickUploadLinkBtn={onClickUploadLinkBtn}
            />
          ) : selectedMethod === '파일 첨부' ? (
            <UploadFile />
          ) : (
            <UploadLink />
          )}
        </div>
      )}
    </div>
  );
}

export default SelectUpload;
