'use client';

import { clsx } from 'clsx';
import ClaimVoteItem from '@/app/home/_component/vote/claim/ClaimVoteItem';
import { useVoteResult } from '@/hooks/vote/useVoteResult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostVote from '@/api/vote/postVote';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useState } from 'react';

interface Props {
  voteData: IGetInGameInfoType[];
  voteCount: number;
  daysUntilEnd: number;
  isOwner: boolean;
  isVote: boolean; // 자신이 투표한 상탠지
}

const ClaimVoteBox = ({ voteData, voteCount, daysUntilEnd, isOwner, isVote }: Props) => {
  // 필요없는 변수들은 없애도 됨 - 지금은 어떤 변수를 가져올수있는지 확인차 모두 나열함
  const {
    shouldBlur,
    isLogin,
    isVoteEnd,
    isNoVote, // 투표한 사람이 아무도 없는지
    setIsLoginModalOpen,
    sortedVoteData,
  } = useVoteResult({ voteCount, daysUntilEnd, voteData, isOwner, isVote }); // DUMMY_VOTE_DATA는 지워야함 나중에 수정할때
  const [claimVoteResult, setClaimVoteResult] = useState<IClaimVoteType[]>([]);
  const { postId } = useParams();
  const id: string = postId as string;
  const { accessToken } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: postVote } = useMutation({
    mutationFn: () => PostVote(id, { voteList: claimVoteResult }, accessToken),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['POST_ITEM', id] });
      await queryClient.invalidateQueries({ queryKey: ['VOTE_RESULT', id] });
    },
    onError: (err) => alert(err.message),
  });

  const onVoteItemClick = (item: IGetInGameInfoType) => {
    if (!isLogin) {
      setIsLoginModalOpen(true);
      return;
    }

    if (isOwner) {
      // 내 게시글일때 동작 x
      return;
    }

    if (isVote) {
      // 이미 자신이 투표 완료한 상태이면 동작 x
      return;
    }

    setClaimVoteResult([{ inGameInfoId: item.inGameInfoId }]);
    postVote();

    console.log('claimVoteResult', claimVoteResult);
  };

  console.log(isVoteEnd, isNoVote);

  return (
    <div className={clsx('w-[659px] h-fit flex flex-col gap-[20px]')}>
      <div className={'w-full h-fit flex flex-col gap-[15px]'}>
        {sortedVoteData.map((item) => (
          <ClaimVoteItem
            key={item.inGameInfoId}
            voteItem={item}
            shouldBlur={shouldBlur}
            onVoteItemClick={() => onVoteItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimVoteBox;
