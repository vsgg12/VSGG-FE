'use client';
import { useQuery } from '@tanstack/react-query';
import getPostItem from '@/api/getPostItem';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Logo from '@/components/Logo';
import Loading from '@/components/Loading';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import { useMediaQuery } from 'react-responsive';
import PostDetailMobile from './mobile/PostDetailMobile';
import { useSidebarStore } from '@/store/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';
import PostDetailPC from './desktop/PostDetailPC';

export default function PostDetailMain() {
  const { postId } = useParams();
  const id: string = postId as string;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { accessToken, isLogin, user } = useAuthStore();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<IGetInGameInfoType[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const { isNotificationOpen, isSearchOpen, setRouteState } = useSidebarStore();
  useBodyScrollLock(isNotificationOpen || isSearchOpen);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', id],
    queryFn: async () => getPostItem(id, isLogin ? accessToken : ''),
  });

  useEffect(() => {
    setRouteState('HOME');
  }, [setRouteState]);

  useEffect(() => {
    if (error?.message === '존재하지 않는 게시글 입니다.') {
      alert(error.message);
      router.replace('/notFound');
    }
  }, [error, router]);

  useEffect(() => {
    if (post && user) {
      if (post.postDTO.memberDTO.nickname === user.nickname) {
        setIsOwner(true);
      }
    }
  }, [post, router, user]);

  return (
    <>
      {isMobile ? (
        <PostDetailMobile />
      ) : (
        <div className='flex w-screen items-center justify-center'>
          {isLoading ? (
            <Loading />
          ) : (
            post && (
              <PostDetailPC post={post} setIsLoginModalOpen={setIsLoginModalOpen} />
              // <div className='flex flex-col items-center justify-center px-[50px]'>
              //   <div>
              //     <NavigationArea />
              //   </div>
              //   <div className='flex flex-row gap-[30px] justify-center'>
              //     <ContentArea post={post} isOwner={isOwner} setVoteData={setVoteData} />
              //     <CommentArea setIsLoginModalOpen={setIsLoginModalOpen} />
              //   </div>
              //   <VoteArea
              //     isOwner={isOwner}
              //     post={post}
              //     voteData={voteData}
              //     setIsLoginModalOpen={setIsLoginModalOpen}
              //   />
              // </div>
            )
          )}
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
