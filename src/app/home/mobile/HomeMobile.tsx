'use client';

import Loading from '@/components/Loading';
import MainHeader from '@/components/mobile/Headers/MainHeader';
import { useEffect, useState } from 'react';
import SearchMobile from './component/SearchMobile';
import { useQuery } from '@tanstack/react-query';
import useSearchStore from '../store/useSearchStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import getPostList from '@/api/getPostList';
import NewPopularToggleButtonMobile from './component/NewPopularToggleButtonMobile';
import AlignModeToggleButtonMobile from './component/AlignModeToggleButtonMobile';
import ListedPostItemMobile from './component/ListedPostItemMobile';
import PostItemMobile from './component/PostItemMobile';

export default function HomeMobile() {
  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const { isLogin, accessToken } = useAuthStore();
  const { keyword } = useSearchStore();
  const [isListed, setIsListed] = useState<boolean>(false);

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

  return (
    <div className='w-full h-[100dvh]'>
      <MainHeader />
      <div className='mobile-layout flex flex-col items-center px-[20px] py-[10px] mobile-scroll'>
        <SearchMobile handleSearch={handleSearch} handleSearchKeyDown={handleSearchKeyDown} />
        <section className='flex flex-col justify-center relative w-full items-center mt-[70px]'>
          <div className='w-full mb-[40px] flex flex-row items-center justify-between'>
            <NewPopularToggleButtonMobile
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
            <AlignModeToggleButtonMobile isListed={isListed} setIsListed={setIsListed} />
          </div>
          {isLoading ? (
            <Loading />
          ) : postData?.postDTO.length === 0 ? (
            <div className='flex flex-col flex-grow items-center justify-center'>
              현재 작성된 게시물이 없습니다.
            </div>
          ) : (
            postData?.postDTO.map((post, idx) => (
              <div key={idx} className='flex flex-col w-full'>
                {isListed ? (
                  <ListedPostItemMobile post={post} />
                ) : (
                  <PostItemMobile post={post} voteInfos={post.inGameInfoList} />
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
