'use client';

import { useQuery } from '@tanstack/react-query';
import getPostItem from '@/api/post/getPostItem';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import Logo from '@/components/Logo';
import Loading from '@/components/Loading';
// import CommentArea from '../_component/CommentArea';
// import ContentArea from '../_component/ContentArea';
// import NavigationArea from '../_component/NavigationArea';
// import VoteArea from '../_component/VoteArea';
import { useMediaQuery } from 'react-responsive';
import PostDetailMobile from './mobile/PostDetailMobile';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';
import useBodyScrollLock from '@/hooks/sidebar/useBodyScrollLock';
import { useLoginStore } from '@/store/login/useLoginStore';
import VoteArea from '@/app/post/_component/vote/VoteArea';
import ContentArea from '@/app/post/_component/content/ContentArea';
import CommentArea from '@/app/post/_component/comment/CommentArea';
import ChampionVoteBox from '@/app/post/_component/vote/champion/ChampionVoteBox';
import { useWriteStore } from '@/store/write/useWriteStore';
import ClaimVoteBox from '@/app/post/_component/vote/claim/ClaimVoteBox';
import PostDetailPC from './desktop/PostDetailPC';

export default function PostDetailMain() {
  const { postId } = useParams();
  const id: string = postId as string;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { accessToken, isLogin, user } = useAuthStore();
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [voteData, setVoteData] = useState<IGetInGameInfoType[]>([]);
  // const { setIsLoginModalOpen } = useLoginStore();
  const { isNotificationOpen, isSearchOpen, setRouteState } = useSidebarStore();
  const { fetchAllChampions } = useWriteStore();
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

  useEffect(() => {
    fetchAllChampions();
  }, []);

  return (
    <>
      {isMobile ? (
        <PostDetailMobile />
      ) : (
        <div className='min-w-[1400px] flex-col items-center'>
          <div className='mb-[100px] mt-[100px] flex flex-col items-center justify-center gap-[32px]'>
            <Logo />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            post && (
              <div className='flex flex-col items-center justify-center px-[50px]'>
                {/*<div>*/}
                {/*  <NavigationArea />*/}
                {/*</div>*/}
                {/* <div className='flex flex-row gap-[30px] justify-center'>
                  <ContentArea post={post} isOwner={isOwner} setVoteData={setVoteData} />
                  <CommentArea setIsLoginModalOpen={setIsLoginModalOpen} />
                </div>
                <VoteArea
                  isOwner={isOwner}
                  post={post}
                  voteData={voteData}
                  setIsLoginModalOpen={setIsLoginModalOpen}
                /> */}

                <div className={'flex gap-[50px] mb-[20px]'}>
                  {/*챔피언 판결 결과 컴포넌트 */}
                  <ChampionVoteBox
                    voteData={voteData}
                    voteCount={30}
                    daysUntilEnd={-1}
                    isOwner={isOwner}
                    isVote={post.postDTO.isVote}
                  />

                  {/*주장 판결 결과 컴포넌트*/}
                  <ClaimVoteBox
                    voteData={voteData}
                    voteCount={30}
                    daysUntilEnd={-1}
                    isOwner={isOwner}
                    isVote={post.postDTO.isVote}
                  />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}
