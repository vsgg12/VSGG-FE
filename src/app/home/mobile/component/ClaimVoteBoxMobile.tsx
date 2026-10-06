'use client';

import { clsx } from 'clsx';
import { useVoteResult } from '@/hooks/vote/useVoteResult';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PostVote from '@/api/vote/postVote';
import { useParams } from 'next/navigation';
import { useAuthStore } from '@/app/login/store/useAuthStore';
import { useState } from 'react';
import ClaimVoteItemMobile from './ClaimVoteItemMobile';

interface Props {
  voteData: IGetInGameInfoType[];
  voteCount: number;
  daysUntilEnd: number;
  isOwner: boolean;
  isVote: boolean; // 자신이 투표한 상탠지
  isHome?: boolean; // 홈에서 보여지는지 여부
}

const ClaimVoteBoxMobile = ({
  voteData,
  voteCount,
  daysUntilEnd,
  isOwner,
  isVote,
  isHome = false,
}: Props) => {
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
  };

  return (
    <div
      className={`relative w-full aspect-video rounded-[30px] overflow-hidden ${shouldBlur && isHome ? 'bg-gradient-to-r from-black/70 to-transparent' : 'bg-white'}`}
    >
      <div
        className={clsx(
          'w-full h-full py-[10px] transition-all duration-300',
          isHome && shouldBlur && 'blur-[8px] opacity-60 pointer-events-none',
        )}
      >
        <div className='relative z-10 w-full h-full flex items-center '>
          <div className={'w-full h-full flex flex-col justify-center gap-[20px] cursor-pointer'}>
            {sortedVoteData.map((item) => (
              <ClaimVoteItemMobile
                key={item.inGameInfoId}
                voteItem={item}
                onVoteItemClick={() => onVoteItemClick(item)}
                isHome={isHome}
              />
            ))}
          </div>
        </div>
      </div>
      {shouldBlur && isHome && (
        <div className='absolute inset-0 flex flex-col justify-center items-center z-50 text-white gap-4'>
          {isOwner && isNoVote && !isVoteEnd ? (
            <div className='text-[20px] font-bold drop-shadow-lg'>
              아직 투표한 사람이 없는 게시글입니다.
            </div>
          ) : (!isLogin || isHome) && !isOwner ? (
            <>
              <div
                className={`flex flex-col items-center gap-1 drop-shadow-lg ${isHome ? 'text-[12px]' : 'text-[20px]'} font-bold`}
              >
                <p>판결이 궁금하시다구요?</p>
                <p>판결에 참여하고, 결과를 확인하세요</p>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className={`bg-primary-500 hover:bg-primary-600 text-white w-[173px] h-[41px] rounded-[5px] font-extrabold ${isHome ? 'text-[16px]' : 'text-[18px]'} transition-colors shadow-xl cursor-pointer`}
              >
                지금 바로 판결하기
              </button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ClaimVoteBoxMobile;
