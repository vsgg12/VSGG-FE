'use client';
import Header from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import getPostItem from '@/api/getPostItem';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Logo from '@/components/Logo';
import Loading from '@/components/Loading';
import ModalLayout from '@/components/modals/ModalLayout';
import AlertLoginModal from '@/components/modals/AlertLoginModal';
import CommentArea from '../_component/CommentArea';
import ContentArea from '../_component/ContentArea';
import NavigationArea from '../_component/NavigationArea';
import VoteArea from '../_component/VoteArea';

export default function PostRead() {
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken, isLogin } = useAuthStore.getState();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<IGetInGameInfoType[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const { data: post, isLoading } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', id],
    queryFn: async () => getPostItem(id, isLogin ? accessToken : ''),
  });

  useEffect(() => {
    if (post?.postDTO.isDeleted === 'TRUE') {
      router.push('/notFound');
    }
  }, [post, router]);

  return (
    <div className='w-[100vw]'>
      <Header />
      <div className='mb-[100px] mt-[100px] flex flex-col items-center justify-center gap-[32px]'>
        <Logo />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        post && (
          <div className='flex flex-col justify-center px-[105px]'>
            <NavigationArea />
            <div className='flex flex-row '>
              <ContentArea isOwner={isOwner} setIsOwner={setIsOwner} setVoteData={setVoteData} />
              <CommentArea setIsLoginModalOpen={setIsLoginModalOpen} />
            </div>
            <VoteArea
              isOwner={isOwner}
              post={post}
              voteData={voteData}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
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
