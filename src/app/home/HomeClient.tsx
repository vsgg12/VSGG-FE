'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getPostList from '@/api/post/getPostList';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import useSearchStore from '@/app/home/store/useSearchStore';
import useIsMobile from '@/hooks/useIsMobile';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';
import { useWriteStore } from '@/store/write/useWriteStore';
import dynamic from 'next/dynamic';
import Loading from '@/components/Loading';

interface Props {
  isMobileUA: boolean;
}

const HomeMobile = dynamic(() => import('./mobile/HomeMobile'), { loading: () => <Loading /> });
const HomeDesktop = dynamic(() => import('./desktop/HomeDesktop'), {
  loading: () => <Loading />,
});

const HomeClient = ({ isMobileUA }: Props) => {
  const isMobile = useIsMobile(isMobileUA);
  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { isLogin, accessToken } = useAuthStore.getState();
  const { keyword } = useSearchStore();
  const { isNotificationOpen, isSearchOpen, setRouteState } = useSidebarStore();
  const { fetchAllChampions } = useWriteStore();

  useBodyScrollLock(isNotificationOpen || isSearchOpen);

  useEffect(() => {
    fetchAllChampions();
    setRouteState('HOME');
  }, [fetchAllChampions, setRouteState]);

  // 무한 스크롤 쿼리 적용 (useInfiniteQuery)
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['POST_LIST', activeButton, keyword],
      queryFn: ({ pageParam = 0 }) => {
        if (activeButton === 'createdatetime' || activeButton === 'view') {
          return getPostList(activeButton, keyword, isLogin ? accessToken : '', pageParam);
        }
        throw new Error('Invalid activeButton value');
      },
      initialPageParam: 0,
      // 서버에서 prefetch한 데이터(revalidate 30초)를 마운트 직후 바로 다시 요청하지 않도록 설정
      staleTime: 30 * 1000,
      getNextPageParam: (lastPage, allPages) => {
        // 백엔드에서 전달받은 postDTO 배열의 길이가 10(size)이면 다음 페이지가 있다고 판단
        // 만약 백엔드 Response에 isLast, totalPages 등의 필드가 있다면 그것을 사용하는 것이 더 정확합니다.
        const currentListLength = lastPage.postDTO?.length || 0;
        return currentListLength === 10 ? allPages.length : undefined;
      },
    });

  // 검색어 초기화 시 데이터 다시 불러오기
  // 첫 마운트 때는 서버에서 prefetch한 데이터를 그대로 쓰기 위해 건너뜀
  const isFirstKeywordEffect = useRef(true);
  useEffect(() => {
    if (isFirstKeywordEffect.current) {
      isFirstKeywordEffect.current = false;
      return;
    }
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch]);

  // 서버에서 받은 첫 목록은 비로그인 기준이라 liked / isVote가 비어 있음
  // → 로그인 사용자는 마운트 후 토큰을 붙여 한 번 다시 받아옴
  useEffect(() => {
    if (isLogin) {
      refetch();
    }
  }, [isLogin, refetch]);

  // 페이지 단위로 들어온 배열들을 하나의 1차원 배열로 병합 및 삭제 데이터 필터링
  // useMemo를 사용하여 불필요한 재연산을 방지합니다.
  const visiblePosts: IGetPostDTOType[] = useMemo(() => {
    if (!data) return [];
    return data.pages
      .flatMap((page) => page.postDTO || [])
      .filter((post) => post.isDeleted === 'FALSE');
  }, [data]);

  // IntersectionObserver를 이용한 다음 페이지 패치 호출
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
  }, [isMobile, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const viewProps = {
    postData: visiblePosts,
    isLoading,
    isFetchingNextPage,
    loaderRef,
    activeButton,
    setActiveButton,
  };
  return isMobile ? <HomeMobile {...viewProps} /> : <HomeDesktop {...viewProps} />;
};

export default HomeClient;
