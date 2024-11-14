'use client';

import HomePostItems from './_component/HomePostItems';
import Image from 'next/image';
import writeSVG from '../../../public/svg/writingWhite.svg';
import Header from '@/components/Header';
import Search from './_component/Search';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPostList from '@/api/getPostList';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';
import useSearchStore from './store/useSearchStore';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import videoPostListsIcon from '../../../public/svg/videoPostListsIcon.svg';
import Icon_ListedIcon from '../../../public/svg/Icon_ListedPost.svg';
import ListedPostItem from './_component/ListedPostItem';

export default function Home() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const { isLogin, accessToken } = useAuthStore.getState();
  const { keyword } = useSearchStore();
  const [visiblePosts, setVisiblePosts] = useState<IGetPostDTOType[]>([]);
  const [postIndex, setPostIndex] = useState(5);
  const loaderRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isListed, setIsListed] = useState<boolean>(false);
  const [existData, setExistData] = useState<IGetPostDTOType[]>([]);

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
    const postLength = existData ?existData.length : 0;
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
    <div className='min-w-[1400px]'>
      <Header />
      <main className='px-[50px]'>
        <Search handleSearch={handleSearch} handleSearchKeyDown={handleSearchKeyDown} />
        <section className='flex justify-center'>
          <div className='relative w-full mx-28'>
            <button
              onClick={handleWriteClick}
              className='fixed bottom-[60px] right-2 z-10 flex h-[7.125rem] w-[7.313rem] flex-col items-center justify-center rounded-full bg-[#8A1F21] text-white shadow-2xl'
            >
              <Image
                className='h-[32px] w-[32px]'
                width={48}
                height={48}
                src={writeSVG}
                alt='writeIcon'
              />
              <div className='text-[0.875rem]'>글쓰기</div>
            </button>
            <div className='mb-[40px] min-w-[1205px] flex flex-row items-center justify-between'>
              <div className='flex h-[34px] w-[184.5px] border-2 border-[#8A1F21] rounded-[150px] relative bg-[#FFFFFF]'>
                <button
                  className={`toggle-button flex-1 h-full w-[94px] rounded-[150px] transition-all duration-300 ${
                    activeButton === 'createdatetime'
                      ? 'bg-[#8A1F21] text-white'
                      : 'bg-white text-[#8A1F21]'
                  }`}
                  onClick={() => setActiveButton('createdatetime')}
                  style={{
                    zIndex: activeButton === 'createdatetime' ? 2 : 1,
                    position: 'absolute',
                  }}
                >
                  최신순
                </button>
                <button
                  className={`toggle-button flex-1 h-full rounded-[150px] w-[94px] transition-all duration-300 ${
                    activeButton === 'view' ? 'bg-[#8A1F21] text-white' : 'bg-white text-[#8A1F21]'
                  }`}
                  onClick={() => setActiveButton('view')}
                  style={{
                    zIndex: activeButton === 'view' ? 2 : 1,
                    position: 'absolute',
                    left: '87.55px',
                  }}
                >
                  인기순
                </button>
              </div>
              <button onClick={() => setIsListed(!isListed)}>
                <Image
                  src={isListed ? Icon_ListedIcon : videoPostListsIcon}
                  width={32}
                  height={32}
                  alt='영상게시글아이콘'
                />
              </button>
            </div>
            {isLoading ? (
              <Loading />
            ) : visiblePosts.length === 0 ? (
              <div className='flex flex-col flex-grow items-center justify-center'>
                현재 작성된 게시물이 없습니다.
              </div>
            ) : (
              visiblePosts.map((post, idx) => (
                <div key={idx}>
                  {isListed ? (
                    <ListedPostItem post={post} />
                  ) : (
                    <HomePostItems post={post} voteInfos={post.inGameInfoList} />
                  )}
                </div>
              ))
            )}
            <div ref={loaderRef} style={{ minHeight: '30px' }} />
          </div>
        </section>
      </main>
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}
