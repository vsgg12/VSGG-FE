'use client';

import HomePostItems from './_component/HomePostItems';
import Image from 'next/image';
import writeSVG from '../../../public/svg/writingWhite.svg';
import Header from '@/components/Header';
import Search from './_component/Search';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getPostList from '@/api/getPostList';
import Loading from '@/components/Loading';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../login/store/useAuthStore';
import useSearchStore from './store/useSearchStore';

const voteInfos: IGetVoteType[] = [
  {
    championName: '뽀삐',
    votedRatio: 3,
    position: '탑',
    tier: '플래티넘',
  },
  {
    championName: '티모',
    votedRatio: 4.5,
    position: '정글',
    tier: '골드',
  },
  {
    championName: '문도박사',
    votedRatio: 5,
    position: '원딜',
    tier: '실버',
  },
  {
    championName: '문도박사',
    votedRatio: 5,
    position: '원딜',
    tier: '실버',
  },
  {
    championName: '문도박사',
    votedRatio: 5,
    position: '원딜',
    tier: '실버',
  },
];

export default function Home() {
  const router = useRouter();
  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const { isLogin, accessToken } = useAuthStore();
  const { keyword } = useSearchStore();

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
    console.log('postData: ', postData);
  }, [keyword, refetch, postData]);

  const handleWriteClick = (): void => {
    if (!isLogin) {
      router.push('/login');
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

  const handleSearch = () => {
    if (!isLogin) {
      router.push('/login');
    } else if (keyword.trim() !== '') {
      refetch();
    }
  };

  return (
    <>
      <Header isLogin={isLogin} />
      <main className='px-[50px]'>
        <Search handleSearch={handleSearch} handleSearchKeyDown={handleSearchKeyDown} />
        <section className='flex justify-center'>
          <div className='relative w-[100%] mx-28'>
            <button
              onClick={handleWriteClick}
              className='fixed bottom-[60px] right-2 z-10 flex h-[7.125rem] w-[7.313rem] flex-col items-center justify-center rounded-full bg-[#8A1F21] text-white shadow-2xl'
            >
              <Image className='h-[32px] w-[32px]' src={writeSVG} alt='writeIcon' />
              <div className='text-[0.875rem]'>글쓰기</div>
            </button>
            <div className='mb-[40px] flex flex-row items-center justify-between'>
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
                    left: '48%',
                  }}
                >
                  인기순
                </button>
              </div>

              <div className='text-xs text-[#909090]'>홈</div>
            </div>
            {isLoading ? (
              <Loading />
            ) : postData?.postDTO.length === 0 ? (
              <div className='flex flex-col flex-grow items-center justify-center'>
                현재 작성된 게시물이 없습니다.
              </div>
            ) : (
              postData &&
              postData.postDTO.map((post, idx) => (
                <div key={idx}>
                  <HomePostItems post={post} voteInfos={voteInfos} />
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
