import React, { useEffect, useState } from 'react';
import ChampionVoteBox from '@/app/post/_component/vote/champion/ChampionVoteBox';
import { useChampion } from '@/hooks/useChampion';
import positions from '@/constants/positions';
import VoteForm from '@/app/post/[postId]/desktop/components/vote/VoteForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import usePostIdStore from '../../../store/usePostIdStore';
import { useParams } from 'next/navigation';
import PostVote from '@/api/vote/postVote';
import { useLoginStore } from '@/store/login/useLoginStore';

interface IVoteArea {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
}

function VoteArea({ voteData, isOwner, post }: IVoteArea) {
  const { loading, getImageUrlByName } = useChampion();
  const { setIsLoginModalOpen } = useLoginStore();
  const [selectedChampion, setSelectedChampion] = useState<string>('');
  const queryClient = useQueryClient();
  const { postVoteResult } = usePostIdStore();
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
    postVote();
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className='w-[719px] bg-white rounded-[20px] flex items-center justify-center'>
      {/*챔피언 판결 결과 컴포넌트 */}
      {/* <ChampionVoteBox
        voteData={voteData}
        voteCount={30}
        daysUntilEnd={-1}
        isOwner={isOwner}
        isVote={post.postDTO.isVote}
      /> */}
      <div></div>
      {/* <div
        className={
          'w-[25px] h-[25px] rounded-[12.5px] bg-white/15 flex justify-center items-center shrink-0'
        }
      ></div>
      <div>
        {voteData.map((data, index) => (
          <div
            className='w-[46px] h-[49px] rounded-[10px]'
            onClick={() => setSelectedChampion(data.position)}
          >
            {getPositionIcon()}
          </div>
        ))}
      </div> */}

      <VoteForm
        voteInfo={voteData}
        voteCount={post.postDTO.voteCount}
        handleVoteSubmit={handleVoteSubmit}
      />
    </div>
  );
}

export default VoteArea;
