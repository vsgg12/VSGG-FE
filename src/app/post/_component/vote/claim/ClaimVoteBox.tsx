'use client';

import { clsx } from 'clsx';
import ClaimVoteItem from '@/app/post/_component/vote/claim/ClaimVoteItem';
import { useVoteResult } from '@/hooks/vote/useVoteResult';

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
    getChampionImage,
    sortedVoteData,
    getCalculatedRatio,
  } = useVoteResult({ voteCount, daysUntilEnd, voteData, isOwner, isVote }); // DUMMY_VOTE_DATA는 지워야함 나중에 수정할때

  const onVoteItemClick = () => {
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

    // 투표하는 api 호출
  };

  console.log(
    isLogin,
    isVoteEnd,
    isNoVote,
    sortedVoteData,
    getCalculatedRatio(100),
    getChampionImage(sortedVoteData[0].championName),
  );

  return (
    <div className={clsx('w-[659px] h-fit flex flex-col gap-[20px]')}>
      <div className={'w-full h-fit flex flex-col gap-[15px]'}>
        {sortedVoteData.map((item) => (
          <ClaimVoteItem
            key={item.inGameInfoId}
            position={item.position}
            championName={item.championName}
            tier={item.tier}
            claim={item.claim!}
            ratio={getCalculatedRatio(item.voteCount)}
            voteCount={item.voteCount}
            shouldBlur={shouldBlur}
            onVoteItemClick={onVoteItemClick}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimVoteBox;
