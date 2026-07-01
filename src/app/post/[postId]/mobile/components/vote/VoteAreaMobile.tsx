import React from 'react';
import ChampionVoteBox from '@/app/home/_component/vote/champion/ChampionVoteBox';
import { useChampion } from '@/hooks/useChampion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useParams } from 'next/navigation';
import PostVote from '@/api/vote/postVote';
import { useLoginStore } from '@/store/login/useLoginStore';
import usePostIdStore from '../../../store/usePostIdStore';
import VoteFormMobile from './VoteFormMobile';

interface IVoteAreaMobile {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
}

function VoteAreaMobile({ voteData, isOwner, post }: IVoteAreaMobile) {
  const { loading } = useChampion();
  const { setIsLoginModalOpen } = useLoginStore();
  const queryClient = useQueryClient();
  const { postVoteResult, voteResult, setPostVoteResult } = usePostIdStore();
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken, isLogin } = useAuthStore();

  const { mutate: postVote } = useMutation({
    mutationFn: () => PostVote(id, { voteList: postVoteResult }, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['POST_ITEM', id] });
      await queryClient.invalidateQueries({ queryKey: ['VOTE_RESULT', id] });
    },
    onError: (err) => alert(err.message),
  });

  const handleVoteSubmit = () => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }
    const newPostVoteResult = post.postDTO.inGameInfoList.map(
      (ingameInfo: IGetInGameInfoType, idx: number) => ({
        inGameInfoId: ingameInfo.inGameInfoId,
        ratio: voteResult[idx] ?? 0,
      }),
    );
    console.log('newPostVoteResult', newPostVoteResult);
    setPostVoteResult(newPostVoteResult);
    console.log('postVoteResult', postVoteResult);
    postVote();
  };

  if (loading) return <div>로딩 중...</div>;

  const shouldShowVoteForm =
    post.postDTO.status === 'PROGRESS' && isLogin && !isOwner && !post.postDTO.isVote;
  const shouldShowVoteResult =
    post.postDTO.status === 'FINISHED' || !isLogin || post.postDTO.isVote || isOwner;

  return (
    <div className='w-full h-fit rounded-[20px] bg-white'>
      {shouldShowVoteForm && (
        <VoteFormMobile
          voteInfo={voteData}
          voteCount={post.postDTO.voteCount}
          handleVoteSubmit={handleVoteSubmit}
        />
      )}
      {shouldShowVoteResult && (
        <ChampionVoteBox
          voteData={voteData}
          voteCount={post.postDTO.voteCount}
          daysUntilEnd={post.postDTO.daysUntilEnd}
          isOwner={isOwner}
          isVote={post.postDTO.isVote}
        />
      )}
    </div>
  );
}

export default VoteAreaMobile;
