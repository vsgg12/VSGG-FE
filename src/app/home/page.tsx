'use client';

import Header from '@/components/Header';
import { useCallback, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPostList from '@/api/getPostList';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';
import useSearchStore from './store/useSearchStore';
import { useWindowSize } from 'react-use';
import DesktopComponent from './desktop/DesktopComponent';
import MobileComponent from './mobile/MobileComponent';
import { useHomeStore } from './store/useHomeStore';

export default function Home() {
  const router = useRouter();
  const { width } = useWindowSize();
  const {
    activeButton,
    setIsLoginModalOpen,
    postIndex,
    existData,
    setPostIndex,
    setVisiblePosts,
    setExistData,
  } = useHomeStore();

  const { isLogin, accessToken } = useAuthStore.getState();
  const { keyword } = useSearchStore();
  const loaderRef = useRef(null);

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

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim() !== '' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      refetch();
    }
  };

  useEffect(() => {
    if (postData && postData.postDTO && postData.postDTO.length > 0) {
      const filteredData = postData.postDTO.filter((post) => post.isDeleted === 'FALSE');
      setExistData(filteredData);
    }
  }, [postData]);

  const handleSearch = () => {
    if (!isLogin) {
      router.push('/login');
    } else if (keyword.trim() !== '') {
      refetch();
    }
  };

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
      setVisiblePosts((prev: IGetPostDTOType[]) => [...prev, ...newPosts]);
      setPostIndex((prev) => prev + 5);
    }
  }, [getPostData, getPostIndex]);

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
    <div className='min-w-[1400px] '>
      <Header />
      {width < 768 ? (
        <MobileComponent />
      ) : (
        <DesktopComponent
          handleWriteClick={handleWriteClick}
          handleSearchKeyDown={handleSearchKeyDown}
          handleSearch={handleSearch}
          isLoading={isLoading}
          loaderRef={loaderRef}
        />
      )}
    </div>
  );
}
