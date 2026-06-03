'use client';

import getPostList from '@/api/post/getPostList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import MobileHeader from '@/components/mobile/Headers/MobileHeader';
import SearchList from './components/SearchList';

function SearchMobile() {
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

  // 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.8 },
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 엔터 키 검색
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() !== '' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      refetch();
    }
  };

  // 검색 버튼 클릭
  const handleSearch = () => {
    if (keyword.trim() !== '') {
      refetch();
    }
  };

  // 키워드 변경
  const onChangeKeyword = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value.trim());
  };

  // 키워드 비어있으면 전체 검색
  useEffect(() => {
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch]);

  return (
    <div className='w-full h-[100dvh] bg-white'>
      <MobileHeader headerTitle='검색' />
      <div className='mobile-layout flex flex-col pt-[20px] px-[16px] mobile-scroll !bg-white'>
        {/* 검색창 */}
        <div className='w-full h-[40px] flex items-center justify-between px-[20px] rounded-[10px] bg-[#F8F9FA] mb-[20px]'>
          <input
            className='flex-1 bg-transparent outline-none text-[16px] text-[#242526]'
            placeholder='제목 혹은 내용 검색'
            value={keyword}
            onChange={onChangeKeyword}
            onKeyDown={handleSearchKeyDown}
          />
          <button onClick={handleSearch}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='13'
              height='13'
              viewBox='0 0 13 13'
              fill='none'
            >
              <path
                d='M12.7716 11.6684L9.83125 8.72812C10.5391 7.78573 10.9213 6.63865 10.92 5.46C10.92 2.44937 8.47062 0 5.46 0C2.44937 0 0 2.44937 0 5.46C0 8.47062 2.44937 10.92 5.46 10.92C6.63865 10.9213 7.78573 10.5391 8.72812 9.83125L11.6684 12.7716C11.8173 12.9046 12.0114 12.9756 12.211 12.97C12.4105 12.9645 12.6004 12.8827 12.7415 12.7415C12.8827 12.6004 12.9645 12.4105 12.97 12.211C12.9756 12.0114 12.9046 11.8173 12.7716 11.6684ZM1.56 5.46C1.56 4.68865 1.78873 3.93463 2.21727 3.29328C2.64581 2.65192 3.2549 2.15205 3.96753 1.85687C4.68017 1.56169 5.46433 1.48446 6.22085 1.63494C6.97738 1.78542 7.67229 2.15686 8.21772 2.70228C8.76314 3.24771 9.13458 3.94262 9.28506 4.69915C9.43554 5.45567 9.35831 6.23983 9.06313 6.95246C8.76795 7.6651 8.26807 8.27419 7.62672 8.70273C6.98537 9.13127 6.23135 9.36 5.46 9.36C4.42604 9.35876 3.43478 8.94747 2.70365 8.21635C1.97253 7.48522 1.56124 6.49396 1.56 5.46Z'
                fill='#E20A29'
              />
            </svg>
          </button>
        </div>

        {/* 검색 결과 텍스트 */}
        {visiblePosts.length > 0 && keyword && (
          <p className='text-[16px] font-medium text-[#242526] mb-[20px]'>
            <span className='text-[#E20A29]'>{keyword}</span>에 대한 검색 결과입니다.
          </p>
        )}

        {/* 검색 결과 리스트 */}
        {visiblePosts && visiblePosts.length > 0 ? (
          <div className='overflow-y-auto scrollbar-hidden'>
            <SearchList postList={visiblePosts} />
            <div ref={loaderRef} />
          </div>
        ) : (
          <div className='text-[12px] text-[#888888] w-full flex justify-center'>
            검색 결과가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchMobile;
