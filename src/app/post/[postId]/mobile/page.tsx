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
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import MobileLogoHeader from '@/components/mobile/Headers/MobileLogoHeader';

export default function PostRead() {
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken, isLogin, user } = useAuthStore.getState();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<IGetInGameInfoType[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { data: post, isLoading } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', id],
    queryFn: async () => getPostItem(id, isLogin ? accessToken : ''),
  });

  useEffect(() => {
    if (post?.postDTO.memberDTO.nickname === user?.nickname) {
      setIsOwner(true);
    }
  }, [post]);

  useEffect(() => {
    if (post?.postDTO.isDeleted === 'TRUE') {
      router.push('/notFound');
    }
  }, [post, router]);

  return (
    <div className='w-full h-[100dvh] overflow-scroll'>
      <MobileLogoHeader />
      {isLoading ? (
        <Loading />
      ) : (
        post && (
          <div className='mobile-layout flex flex-col items-center px-[20px] py-[20px]'>
            <ContentAreaMobile
              isOwner={isOwner}
              setIsOwner={setIsOwner}
              setVoteData={setVoteData}
            />
            <VoteAreaMobile
              isOwner={isOwner}
              post={post}
              voteData={voteData}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
            <CommentAreaMobile setIsLoginModalOpen={setIsLoginModalOpen} />
          </div>
        )
      )}
      {isLoginModalOpen && (
        <ModalLayout setIsModalOpen={setIsLoginModalOpen}>
          <AlertLoginModal />
        </ModalLayout>
      )}
    </div>
  );
}
