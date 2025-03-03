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
import { useMediaQuery } from 'react-responsive';
import PostDetailMobile from './mobile/PostDetailMobile';
import getAlarms from '@/api/getAlarms';
import getMyProfileDTO from '@/api/getMyProfileDTO';

export default function PostRead() {
  const { postId } = useParams();
  const id: string = postId as string;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { accessToken, isLogin, user } = useAuthStore();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<IGetInGameInfoType[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<IGetPostItemType>({
    queryKey: ['POST_ITEM', id],
    queryFn: async () => getPostItem(id, isLogin ? accessToken : ''),
  });

  const { data: userProfileData } = useQuery({
    queryKey: ['MY_PROFILE_INFO'],
    queryFn: () => getMyProfileDTO(accessToken),
    enabled: isLogin && !isMobile,
  });

  const { data: alarmData } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(accessToken),
    enabled: isLogin && !isMobile,
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
    <>
      {isMobile ? (
        <PostDetailMobile />
      ) : (
        <div className='min-w-[1400px] flex-col items-center'>
          <Header userProfileData={userProfileData} alarmData={alarmData} />
          <div className='mb-[100px] mt-[100px] flex flex-col items-center justify-center gap-[32px]'>
            <Logo />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            post && (
              <div className='flex flex-col items-center justify-center px-[50px]'>
                <div>
                  <NavigationArea />
                </div>
                <div className='flex flex-row gap-[30px] justify-center'>
                  <ContentArea post={post} isOwner={isOwner} setVoteData={setVoteData} />
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
      )}{' '}
    </>
  );
}
