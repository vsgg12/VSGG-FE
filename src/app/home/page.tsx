'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPostList from '@/api/getPostList';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';
import useSearchStore from './store/useSearchStore';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import NewPopularToggleButton from './_component/NewPopularToggleButton';
import AlignModeToggleButton from './_component/AlignModeToggleButton';
import { useMediaQuery } from 'react-responsive';
import HomeMobile from './mobile/HomeMobile';
import PostItem from './_component/PostItem';
import PostCommentArea from './_component/PostCommentArea';
import WritePost from './_component/WritePost';
import { useSidebarStore } from '@/store/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';
import ListPostItem from './_component/ListPostItem';

export default function Home() {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const { isLogin, accessToken } = useAuthStore.getState();
  const { keyword } = useSearchStore();
  const [visiblePosts, setVisiblePosts] = useState<IGetPostDTOType[]>([]);
  const [postIndex, setPostIndex] = useState(5);
  const loaderRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isListed, setIsListed] = useState<boolean>(false);
  const [existData, setExistData] = useState<IGetPostDTOType[]>([]);
  const [showCommentPostId, setShowCommentPostId] = useState<number>(-1);
  const { isNotificationOpen, isSearchOpen, setRouteState } = useSidebarStore();
  useBodyScrollLock(isNotificationOpen || isSearchOpen);

  const {
    data: postData,
    isLoading,
    refetch,
  } = useQuery<IGetPostListType>({
    queryKey: ['POST_LIST', activeButton],
    queryFn: () => {
      if (activeButton === 'createdatetime' || activeButton === 'view') {
        return getPostList(activeButton, keyword, isLogin ? accessToken : '');
      }
      throw new Error('Invalid activeButton value');
    },
  });

  useEffect(() => {
    setRouteState('HOME');
  }, [setRouteState]);

  useEffect(() => {
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch, postData]);

  useEffect(() => {
    if (postData?.postDTO) {
      setVisiblePosts(existData.slice(0, 5));
      setPostIndex(5); // 초기 로드 후 인덱스를 다시 설정해야 함
    }
  }, [postData, existData]);

  const handleWriteClick = (): void => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    router.push('/post/write');
  };

  useEffect(() => {
    if (postData && postData.postDTO && postData.postDTO.length > 0) {
      const filteredData = postData.postDTO.filter((post) => post.isDeleted === 'FALSE');
      setExistData(filteredData);
    }
  }, [postData]);

  const getPostData = useCallback(() => existData, [existData]);
  const getPostIndex = useCallback(() => postIndex, [postIndex]);

  const loadMore = useCallback(() => {
    const postLength = existData ? existData.length : 0;
    const currentPostData = getPostData();
    const currentPostIndex = getPostIndex();
    if (currentPostData) {
      const newPosts = currentPostData.slice(
        currentPostIndex,
        currentPostIndex + 5 < postLength ? currentPostIndex + 5 : postLength,
      );
      setVisiblePosts((prev) => [...prev, ...newPosts]);
      setPostIndex((prev) => prev + 5);
    }
  }, [existData, getPostData, getPostIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const currentPostIndex = getPostIndex();
            const currentPostData = getPostData();
            if (currentPostData && currentPostIndex < currentPostData.length) {
              loadMore();
            }
          }
        });
      },
      { threshold: 0.8 },
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, loadMore, getPostIndex, getPostData]);

  return (
    <>
      {isMobile ? (
        <HomeMobile />
      ) : (
        <div className='flex w-screen items-center justify-center pl-[260px]'>
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
                visiblePosts.map((post, idx) =>
                  isListed ? (
                    <ListPostItem post={post} key={idx} />
                  ) : (
                    <div className='relative'>
                      <PostItem
                        post={post}
                        voteInfos={post.inGameInfoList}
                        showCommentPostId={showCommentPostId}
                        setShowCommentPostId={setShowCommentPostId}
                      />
                      {showCommentPostId == post.id && (
                        <div className='h-full pt-[48px] absolute bottom-0 left-full translate-x-[10px]'>
                          <PostCommentArea postId={post.id} />
                        </div>
                      )}
                    </div>
                  ),
                )
              )}
            </div>
            <div ref={loaderRef} style={{ minHeight: '30px' }} />
          </section>
          {isLoginModalOpen && (
            <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
              <AlertLoginModal />
            </ModalLayout>
          )}
        </div>
      )}
    </>
  );
}
