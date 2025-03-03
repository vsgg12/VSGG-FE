'use client';
import { useQuery } from '@tanstack/react-query';
import getPostItem from '@/api/getPostItem';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Loading from '@/components/Loading';
import ContentAreaMobile from './components/ContentAreaMobile';
import CommentAreaMobile from './components/CommentAreaMobile';
import VoteAreaMobile from './components/VoteAreaMobile';
import ModalLayout from '@/components/modals/ModalLayout';
import MobileLogoHeader from '@/components/mobile/Headers/MobileLogoHeader';
import AlertLoginModal_Mobile from '@/components/mobile/modals/AlertLoginModalMobile';

export default function PostDetailMobile() {
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken, isLogin, user } = useAuthStore.getState();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', id],
    queryFn: async () => getPostItem(id, isLogin ? accessToken : ''),
  });

  useEffect(() => {
    if (error?.message === '존재하지 않는 게시글 입니다.') {
      alert(error.message);
      router.replace('/notFound');
    }
  }, [error]);

  useEffect(() => {
    if (post && user) {
      if (post.postDTO.memberDTO.nickname === user.nickname) {
        setIsOwner(true);
      }
    }
  }, [post]);

  return (
    <div className='w-full h-[100dvh] overflow-scroll'>
      <MobileLogoHeader />
      {isLoading ? (
        <Loading />
      ) : (
        post && (
          <div className='mobile-layout flex flex-col items-center px-[20px] py-[20px] scroll'>
            <ContentAreaMobile post={post} isOwner={isOwner} />
            <VoteAreaMobile
              isOwner={isOwner}
              post={post}
              voteData={post.postDTO.inGameInfoList}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
            <CommentAreaMobile setIsLoginModalOpen={setIsLoginModalOpen} />
          </div>
        )
      )}
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal_Mobile />
        </ModalLayout>
      )}
    </div>
  );
}
