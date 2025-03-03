'use client';

import getMyJudgeList from '@/api/getMyJudgeList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import IsNotExistList from '../../_component/IsNotExistList';
import MyJudgeItem_Mobile from '../_component/MyJudgeItem';

function JudgeRecord_Mobile() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { accessToken, isLogin } = useAuthStore();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [judgeList, setJudgeList] = useState<IVotedPostItem[]>([]);

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ['MY_JUDGE_LISTS', page],
    queryFn: () => getMyJudgeList({ token: accessToken, size: '10', page: String(page) }),
    enabled: isLogin
  });

  useEffect(() => {
    if (data?.postList) {
      setJudgeList((prev) => [...prev, ...data.postList]); 
    }
  }, [data]);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data!.pageInfo.totalPageNum > page) {
          setPage((prev) => prev + 1); // 페이지 증가
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(bottomRef.current);

    return () => {
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, [data, page]);

  useEffect(() => {
    if (page > 1) {
      refetch(); // 🔹 페이지 증가 시 refetch 실행
    }
  }, [page, refetch]);

  if (isLoading && page === 1) {
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
        {judgeList.length === 0 ? (
          <div className='flex justify-center items-center w-full h-full'>
            <IsNotExistList type='myJudge' />
          </div>
        ) : (
          judgeList.map((judgeItem) => (
            <MyJudgeItem_Mobile judgeItem={judgeItem} key={judgeItem.id} />
          ))
        )}
      </div>
      {isFetching && (
        <div className='w-full flex justify-center py-[10px]'>
          <Loading />
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default JudgeRecord_Mobile;
