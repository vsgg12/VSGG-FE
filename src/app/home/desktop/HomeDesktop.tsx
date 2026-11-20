'use client';
import React, { SetStateAction, useState, Ref, Dispatch } from 'react';
import Loading from '@/components/Loading';
import Sidebar from '@/components/sidebar/Sidebar';
import WritePost from './_components/WritePost';
import NewPopularToggleButton from '../_component/NewPopularToggleButton';
import AlignModeToggleButton from '../_component/AlignModeToggleButton';
import ListPostItem from '../_component/ListPostItem';
import PostItem from './_components/PostItem';
import PostCommentArea from './_components/PostCommentArea';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useAuthStore } from '@/app/login/store/useAuthStore';

interface Props {
  postData: IGetPostDTOType[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  loaderRef: Ref<HTMLDivElement>;
  activeButton: string;
  setActiveButton: Dispatch<SetStateAction<string>>;
}

export default function HomeDesktop({
  postData,
  isLoading,
  isFetchingNextPage,
  loaderRef,
  activeButton,
  setActiveButton,
}: Props) {
  const router = useRouter();
  const { isLogin } = useAuthStore.getState();
  const [isListed, setIsListed] = useState<boolean>(false);
  const [showCommentPostId, setShowCommentPostId] = useState<number>(-1);
  const { setIsLoginModalOpen } = useLoginStore();

  // 글쓰기 버튼 이벤트
  const handleWriteClick = (): void => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    router.push('/post/selectUpload');
  };

  return (
    <div className='flex min-h-screen w-screen items-start justify-center bg-semantic-background-page pl-[260px] text-semantic-text-primary'>
      <Sidebar />
      <section
        className={`flex flex-col relative ${isListed ? 'min-w-[1022px]' : 'min-w-[698px]'} mt-[40px]`}
      >
        <WritePost handleWriteClick={handleWriteClick} isListed={isListed} />
        <div
          className={`${isListed ? 'w-full' : 'w-[640px]'} mb-[40px] mt-[40px] flex flex-row items-center justify-between`}
        >
          <NewPopularToggleButton activeButton={activeButton} setActiveButton={setActiveButton} />
          <AlignModeToggleButton isListed={isListed} setIsListed={setIsListed} isHome={true} />
        </div>

        <div className={`${isListed ? 'grid grid-cols-3 gap-[30px]' : 'flex flex-col gap-[40px]'}`}>
          {isLoading ? (
            <Loading />
          ) : postData.length === 0 ? (
            <div className='flex w-full flex-col flex-grow items-center justify-center text-semantic-text-muted'>
              현재 작성된 게시물이 없습니다.
            </div>
          ) : (
            postData.map((post) =>
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
  );
}
