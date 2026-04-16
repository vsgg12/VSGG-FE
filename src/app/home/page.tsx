'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import getPostList from '@/api/post/getPostList';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';
import useSearchStore from './store/useSearchStore';
import NewPopularToggleButton from './_component/NewPopularToggleButton';
import AlignModeToggleButton from './_component/AlignModeToggleButton';
import { useMediaQuery } from 'react-responsive';
import HomeMobile from './mobile/HomeMobile';
import PostItem from './desktop/PostItem';
import PostCommentArea from './desktop/PostCommentArea';
import WritePost from './desktop/WritePost';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';
import ListPostItem from './_component/ListPostItem';
import Sidebar from '@/components/sidebar/Sidebar';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useWriteStore } from '@/store/write/useWriteStore';

export default function Home(): JSX.Element {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const [isListed, setIsListed] = useState<boolean>(false);
  const [showCommentPostId, setShowCommentPostId] = useState<number>(-1);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { isLogin, accessToken } = useAuthStore.getState();
  const { keyword } = useSearchStore();
  const { setIsLoginModalOpen } = useLoginStore();
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
      getNextPageParam: (lastPage, allPages) => {
        // 백엔드에서 전달받은 postDTO 배열의 길이가 10(size)이면 다음 페이지가 있다고 판단
        // 만약 백엔드 Response에 isLast, totalPages 등의 필드가 있다면 그것을 사용하는 것이 더 정확합니다.
        const currentListLength = lastPage.postDTO?.length || 0;
        return currentListLength === 10 ? allPages.length : undefined;
      },
    });

  // 검색어 초기화 시 데이터 다시 불러오기
  useEffect(() => {
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch]);

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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 글쓰기 버튼 이벤트
  const handleWriteClick = (): void => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    router.push('/post/selectUpload');
  };

  return (
    <>
      {isMobile ? (
        <HomeMobile />
      ) : (
        <div className='flex w-screen items-center justify-center pl-[260px]'>
          <Sidebar />
          <section
            className={`flex flex-col relative ${isListed ? 'min-w-[1022px]' : 'min-w-[698px]'} mt-[40px]`}
          >
            <WritePost handleWriteClick={handleWriteClick} isListed={isListed} />
            <div
              className={`${isListed ? 'w-full' : 'w-[640px]'} mb-[40px] mt-[40px] flex flex-row items-center justify-between`}
            >
              <NewPopularToggleButton
                activeButton={activeButton}
                setActiveButton={setActiveButton}
              />
              <AlignModeToggleButton isListed={isListed} setIsListed={setIsListed} />
            </div>

            <div
              className={`${isListed ? 'grid grid-cols-3 gap-[30px]' : 'flex flex-col gap-[40px]'}`}
            >
              {isLoading ? (
                <Loading />
              ) : visiblePosts.length === 0 ? (
                <div className='flex w-full flex-col flex-grow items-center justify-center'>
                  현재 작성된 게시물이 없습니다.
                </div>
              ) : (
                visiblePosts.map((post) =>
                  isListed ? (
                    <ListPostItem post={post} key={post.id} />
                  ) : (
                    <div className='relative' key={post.id}>
                      <PostItem
                        post={post}
                        voteInfos={post.inGameInfoList}
                        showCommentPostId={showCommentPostId}
                        setShowCommentPostId={setShowCommentPostId}
                      />
                      {showCommentPostId === post.id && (
                        <div className='h-full pt-[48px] absolute bottom-0 left-full translate-x-[10px]'>
                          <PostCommentArea postId={post.id} />
                        </div>
                      )}
                    </div>
                  ),
                )
              )}
              {/* 스크롤 시 데이터를 불러오는 중일 때의 로딩 처리 (선택 사항) */}
              {isFetchingNextPage && (
                <div className='text-center py-4'>게시물을 불러오는 중입니다...</div>
              )}
            </div>

            {/* Observer Target */}
            <div ref={loaderRef} style={{ minHeight: '30px' }} />
          </section>
        </div>
      )}
    </>
  );
}
