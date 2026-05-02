'use client';

import getPostList from '@/api/post/getPostList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import SearchInputContainer from './SearchInputContainer';
import SearchList from './SearchList';

function SearchModal() {
  const { isLogin, accessToken } = useAuthStore();
  const [keyword, setKeyword] = useState<string>('');
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data: postData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['POST_LIST', 'createdatetime', keyword],
    queryFn: ({ pageParam = 0 }) => {
      return getPostList('createdatetime', keyword, isLogin ? accessToken : '', pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      // 백엔드에서 전달받은 postDTO 배열의 길이가 10(size)이면 다음 페이지가 있다고 판단
      // 만약 백엔드 Response에 isLast, totalPages 등의 필드가 있다면 그것을 사용하는 것이 더 정확합니다.
      const currentListLength = lastPage.postDTO?.length || 0;
      return currentListLength === 10 ? allPages.length : undefined;
    },
  });

  const visiblePosts: IGetPostDTOType[] = useMemo(() => {
    if (!postData) return [];
    return postData.pages
      .flatMap((page) => page.postDTO || [])
      .filter((post) => post.isDeleted === 'FALSE');
  }, [postData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        // 교차 영역에 들어왔고, 다음 페이지가 존재하며, 현재 패치 중이 아닐 때만 호출
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.8 },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() !== '' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      refetch();
    }
  };

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      refetch();
    }
  };

  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    const trimKeyword = e.target.value.trim();
    setKeyword(trimKeyword);
  };

  useEffect(() => {
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <div
      className='w-[362px] min-w-[362px] h-screen py-[40px] bg-[#FFFFFF] z-[100]'
      style={{
        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='h-full flex flex-col gap-[30px]'>
        <p className='text-[#888888] text-[20px] font-bold pl-[16px]'>검색</p>
        <SearchInputContainer
          handleSearchKeyDown={handleSearchKeyDown}
          handleSearch={handleSearch}
          onChangeKeyword={onChangeKeyword}
          keyword={keyword}
          visible={Number(visiblePosts.length) > 0}
        />
        <div className='flex-1 min-h-0 px-[16px] overflow-y-auto scrollbar-hidden'>
          {visiblePosts && visiblePosts.length > 0 ? (
            <div className='overflow-y-auto h-full scrollbar-hidden'>
              <SearchList postList={visiblePosts} />
            </div>
          ) : (
            <div className='text-[12px] text-[#888888] w-full justify-center flex'>
              검색 결과가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchModal;
