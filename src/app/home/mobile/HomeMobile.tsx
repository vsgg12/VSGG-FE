'use client';

import Loading from '@/components/Loading';
import MainHeader from '@/components/mobile/Headers/MainHeader';
import { useEffect, useState } from 'react';
import useSearchStore from '../store/useSearchStore';
import ListedPostItemMobile from './component/ListedPostItemMobile';
import PostItemMobile from './component/PostItemMobile';
import NewPopularToggleButton from '../_component/NewPopularToggleButton';
import AlignModeToggleButton from '../_component/AlignModeToggleButton';
import HorizontalBannerSwiper from '@/components/sidebar/banner/HorizontalBannerSwiper';
import WritePostMobile from './component/WritePostMobile';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useLoginStore } from '@/store/login/useLoginStore';


interface Props {
  postData: IGetPostDTOType[];
  isLoading: boolean;
  refetch: () => void;
}

export default function HomeMobile({ postData, isLoading, refetch }: Props) {
  const [activeButton, setActiveButton] = useState<string>('createdatetime');
  const { keyword } = useSearchStore();
  const [isListed, setIsListed] = useState<boolean>(false);

  const router = useRouter();
  const { isLogin } = useAuthStore.getState();
  const { setIsLoginModalOpen } = useLoginStore();

  const handleWriteClick = (): void => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    router.push('/post/selectUpload');
  };

  useEffect(() => {
    if (keyword === '') {
      refetch();
    }
  }, [keyword, refetch, postData]);

  return (
    <div className='w-full h-[100dvh] bg-[#F8F9FA]'>
      <MainHeader />
      <div className='mobile-layout flex flex-col items-center py-[10px] mobile-scroll !bg-[#F8F9FA]'>
        <div className='mb-[20px] px-[10px] mt-[20px] flex justify-center'>
          <HorizontalBannerSwiper />
        </div>
        <div className='mt-[22px] w-full mb-[20px]'>
          <WritePostMobile handleWriteClick={handleWriteClick} />
        </div>
        <div className='w-full mb-[30px] flex items-center justify-between px-[20px]'>
          <NewPopularToggleButton
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            isMobile={true}
          />
          <AlignModeToggleButton isListed={isListed} setIsListed={setIsListed} />
        </div>
        {isLoading ? (
          <Loading />
        ) : postData?.length === 0 ? (
          <div className='flex flex-col flex-grow items-center justify-center'>
            현재 작성된 게시물이 없습니다.
          </div>
        ) : (
          postData?.map((post, idx) => (
            <div key={idx} className='flex flex-col w-full'>
              {isListed ? (
                <ListedPostItemMobile post={post} />
              ) : (
                <PostItemMobile post={post} voteInfos={post.inGameInfoList} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
