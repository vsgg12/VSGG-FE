'use client';

import getMyJudgeList from '@/api/getMyJudgeList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import IsNotExistList from '../../_component/IsNotExistList';
import MyJudgeItem_Mobile from '../_component/MyJudgeItem';

function JudgeRecord_Mobile() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { accessToken, isLogin } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['MY_JUDGE_LISTS'],
    queryFn: ({ pageParam = 1 }) =>
      getMyJudgeList({ token: accessToken, size: '10', page: String(pageParam) }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.pageInfo) return undefined;

      const nextPage = lastPage.pageInfo.page + 1;
      return nextPage <= lastPage.pageInfo.totalPageNum ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const myJudgeLists = data ?? { pages: [], pageParams: [] };

  useEffect(() => {
    if (!isLoading && myJudgeLists) {
      console.log('myJudgeLists:', myJudgeLists);
      console.log('myJudgeLists.pages:', myJudgeLists?.pages);
      console.log('myJudgeLists.pages[0]?.postList:', myJudgeLists?.pages?.[0]?.postList);
    }
  }, [myJudgeLists]);

  useEffect(() => {
    if (!bottomRef.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(bottomRef.current);

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
      <MobileHeader headerTitle='판결 전적' />
      <div className='mobile-layout flex-grow flex flex-col items-center px-[20px] pt-[20px] mobile-scroll'>
        {isLoading ? (
          <div className='w-full h-full flex justify-center items-center'>
            <Loading />
          </div>
        ) : myJudgeLists.pages[0]?.postList.length < 1 ? (
          <div className='flex justify-center items-center w-full h-full'>
            <IsNotExistList type='myJudge' />
          </div>
        ) : (
          myJudgeLists.pages.map((page) =>
            page?.postList?.map((judgeItem: IVotedPostItem) => (
              <MyJudgeItem_Mobile judgeItem={judgeItem} key={judgeItem.id} />
            )),
          )
        )}
      </div>
      {isFetchingNextPage && (
        <div className='w-full flex justify-center py-[10px]'>
          <Loading />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default JudgeRecord_Mobile;
