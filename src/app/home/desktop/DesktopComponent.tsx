import React, { MutableRefObject } from 'react';
import Search from '../_component/Search';
import NewPopularToggleButton from '../_component/NewPopularToggleButton';
import AlignModeToggleButton from '../_component/AlignModeToggleButton';
import Loading from '@/components/Loading';
import ListedPostItem from '../_component/ListedPostItem';
import HomePostItems from '../_component/HomePostItems';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import Image from 'next/image';
import writeSVG from '../../../../public/svg/writingWhite.svg';
import { useHomeStore } from '../store/useHomeStore';

interface IDesktopProps {
  handleWriteClick: () => void;
  handleSearchKeyDown: () => void;
  handleSearch: () => void;
  isLoading: boolean;
  loaderRef: MutableRefObject<null>;
}

function DesktopComponent({
  handleWriteClick,
  handleSearchKeyDown,
  handleSearch,
  isLoading,
  loaderRef,
}: IDesktopProps) {
  const { isListed, isLoginModalOpen, visiblePosts, setIsLoginModalOpen } = useHomeStore();
  return (
    <div>
      <main className='px-[50px]'>
        <Search handleSearch={handleSearch} handleSearchKeyDown={handleSearchKeyDown} />
        <section className='flex flex-col justify-center relative w-full items-center'>
          <div className='min-w-[1400px] px-[50px] mb-[40px] flex flex-row items-center justify-between'>
            <NewPopularToggleButton />
            <AlignModeToggleButton />
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
        </section>
      </main>
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
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
    </div>
  );
}

export default DesktopComponent;
