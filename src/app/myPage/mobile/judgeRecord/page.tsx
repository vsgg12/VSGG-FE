'use client';

import getMyJudgeList from '@/api/getMyJudgeList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import MobileHeader from '@/components/mobile/MobileHeader';
import { useMobileVersionStore } from '@/store/useMobileVersionStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import MyJudgeItem from '../_component/MyJudgeItem';

function JudgeRecord_Mobile() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { isMobileVersion } = useMobileVersionStore.getState();
  const { accessToken } = useAuthStore.getState();

  const router = useRouter();

  useEffect(() => {
    if (isMobileVersion === false) {
      router.replace('/myPage/judgeRecord');
    }
    setIsPageLoading(false);
  }, []);

  const {
    data: myJudgeLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['MY_JUDGE_LISTS'],
    queryFn: ({ pageParam = 1 }) =>
      getMyJudgeList({ token: accessToken, size: '10', page: String(pageParam) }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.pageInfo.totalPageNum ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [bottomRef, fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <div className='w-full h-[100dvh] items-center flex'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='px-[10px] h-[100dvh]'>
      {isPageLoading ? (
        <div className='w-full items-center flex'>
          <Loading />
        </div>
      ) : (
        <>
          <MobileHeader headerTitle='판결 전적' />
          <div className='mobile-layout flex-grow flex flex-col items-center px-[20px] pt-[20px]'>
            {myJudgeLists &&
              myJudgeLists.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.postList.map((judgeItem: IVotedPostItem) => (
                    <MyJudgeItem judgeItem={judgeItem} />
                  ))}
                </React.Fragment>
              ))}
          </div>
          {isFetchingNextPage && (
            <div className='w-full flex justify-center py-[10px]'>
              <Loading />
            </div>
          )}
          <div ref={bottomRef} />
        </>
      )}
    </div>
  );
}

export default JudgeRecord_Mobile;
