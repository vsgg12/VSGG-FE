'use client';
import getMyPostLists from '@/api/getMyPostLists';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import { useMobileVersionStore } from '@/store/useMobileVersionStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import MyPostItem from '../_component/MyPostItem';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';

function MyPost_Mobile() {
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const { isMobileVersion } = useMobileVersionStore.getState();
  const { accessToken } = useAuthStore.getState();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (isMobileVersion === false) {
      router.replace('/myPage/judgeRecord');
    }
    setIsPageLoading(false);
  }, []);

  const {
    data: myPostLists,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['MY_POST_LISTS'],
    queryFn: ({ pageParam = 1 }) =>
      getMyPostLists({ token: accessToken, size: '10', page: String(pageParam) }),
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
    <div className='px-[10px]  h-[100dvh]'>
      {isPageLoading ? (
        <div className='w-full items-center flex'>
          <Loading />
        </div>
      ) : (
        <>
          <MobileHeader headerTitle='내가 쓴 글' />
          <div className='mobile-layout flex flex-col flex-grow items-center px-[20px] pt-[20px]'>
            {myPostLists &&
              myPostLists.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.postList.map((postItem: IGetMyPostItemsType) => (
                    <MyPostItem postItem={postItem} />
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

export default MyPost_Mobile;
