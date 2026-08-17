import React from 'react';
import ChampionVoteBox from '@/app/home/_component/vote/champion/ChampionVoteBox';
import { useChampion } from '@/hooks/useChampion';
import VoteForm from '@/app/post/[postId]/desktop/components/vote/VoteForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import usePostIdStore from '../../../store/usePostIdStore';
import { useParams } from 'next/navigation';
import PostVote from '@/api/vote/postVote';
import { useLoginStore } from '@/store/login/useLoginStore';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface IVoteArea {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
}

function VoteArea({ voteData, isOwner, post }: IVoteArea) {
  const { loading } = useChampion();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
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

  const shouldShowVoteForm = post.postDTO.status === 'PROGRESS' && isLogin && !isOwner && !post.postDTO.isVote;
  const shouldShowVoteResult =
    post.postDTO.status === 'FINISHED' || !isLogin || post.postDTO.isVote || isOwner;

  return (
    <div
      className={`w-[720px] rounded-[20px] flex items-center justify-center p-[30px] ${
        isDarkMode ? 'bg-[#242526]' : 'bg-white'
      }`}
    >
      {shouldShowVoteForm && (
        <VoteForm
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

export default VoteArea;
