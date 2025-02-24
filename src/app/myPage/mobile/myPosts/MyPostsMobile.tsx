'use client';
import getMyPostLists from '@/api/getMyPostLists';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import MyPostItem_Mobile from '../_component/MyPostItem';

function MyPost_Mobile() {
  const { accessToken, isLogin } = useAuthStore.getState();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push('/login');
    }
  }, [isLogin, router]);

  const {
    data: myPostLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['MY_POST_LISTS'],
    queryFn: async ({ pageParam = 1 }) => {
      if (!accessToken) {
        return null;
      }
      const result = await getMyPostLists({ token: accessToken, size: '10', page: String(pageParam) });
      return result;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage?.pageInfo?.totalPageNum) return undefined;
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.pageInfo.totalPageNum ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!accessToken,
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

    const refElement = bottomRef.current;
    if (refElement) {
      observer.observe(refElement);
    }

    return () => {
      if (refElement) {
        observer.unobserve(refElement);
      }
    };
  }, [bottomRef, fetchNextPage, hasNextPage]);

  useEffect(() => {
    console.log(myPostLists);
  }, [myPostLists]);

  if (isLoading || myPostLists === undefined) {
    return (
      <div className='w-full h-[100dvh] items-center flex'>
        <Loading />
      </div>
    );
  }

  if (!myPostLists || !myPostLists.pages || myPostLists.pages.length === 0) {
    return (
      <div className='w-full h-[100dvh] flex items-center justify-center'>
        <p>게시글이 없습니다.</p>
      </div>
    );
  }

  const firstPage = myPostLists.pages[0];
  const postList = firstPage?.postList ?? [];

  if (postList.length === 0) {
    return (
      <div className='w-full h-[100dvh] flex items-center justify-center'>
        <p>게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='px-[10px] h-[100dvh]'>
      <MobileHeader headerTitle='내가 쓴 글' />
      <div className='mobile-layout flex flex-col flex-grow items-center px-[20px] pt-[20px] mobile-scroll'>
        {myPostLists.pages.map((page) =>
          (page?.postList ?? []).map((postItem: IGetMyPostItemsType) => (
            <MyPostItem_Mobile postItem={postItem} key={postItem.id} />
          )),
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

export default MyPost_Mobile;
