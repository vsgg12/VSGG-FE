'use client';
import getMyPostLists from '@/api/getMyPostLists';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import MyPostItem_Mobile from '../_component/MyPostItem';
import IsNotExistList from '../../_component/IsNotExistList';

function MyPost_Mobile() {
  const { accessToken, isLogin } = useAuthStore.getState();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [myPostLists, setMyPostLists] = useState<IGetMyPostItemsType[]>([]);

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  const {
    data = { pageInfo: { page: 1, size: 10, totalPageNum: 1 }, postList: [] },
    refetch,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['MY_POST_LISTS', page],
    queryFn: () => getMyPostLists({ token: accessToken, size: '10', page: String(page) }),
    staleTime: 1000 * 60 * 5,
    enabled: isLogin,
  });

  useEffect(() => {
    if (!isLoading && data.postList.length > 0 || !isFetching && data.postList.length > 0) {
      setMyPostLists((prev) => [...prev, ...data.postList]);
    }
  }, [data]);

  useEffect(() => {
    if (!bottomRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data.pageInfo.totalPageNum > page) {
          setPage((prev) => prev + 1);
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
      refetch();
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
      <MobileHeader headerTitle='내가 쓴 글' />
      <div className='mobile-layout flex flex-col flex-grow items-center px-[20px] pt-[20px] mobile-scroll'>
        {myPostLists.length === 0 ? (
          <div className='flex justify-center items-center w-full h-full'>
            <IsNotExistList type='myPost' />
          </div>
        ) : (
          myPostLists.map((postItem: IGetMyPostItemsType) => (
            <MyPostItem_Mobile postItem={postItem} key={postItem.id} />
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

export default MyPost_Mobile;
