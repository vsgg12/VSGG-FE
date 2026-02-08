'use client';

import { clsx } from 'clsx';
import ClaimVoteItem from '@/app/post/_component/vote/claim/ClaimVoteItem';
import { useVoteResult } from '@/hooks/vote/useVoteResult';

// 더미 데이터 (테스트용)
const DUMMY_VOTE_DATA = [
  {
    inGameInfoId: 1,
    position: '미드',
    championName: '트위스티드 페이트',
    claim: '탑 라인을 안 밀고 집에 갔어야 했다. 이건 명백한 판단 미스다.',
    tier: '골드',
    voteNum: 11, // 벡엔드에 추가해 달라해야함
    averageRatio: 2,
  },
  {
    inGameInfoId: 2,
    position: '원딜',
    championName: '베인',
    claim: '서폿이 안 지켜줘서 죽은 거다. 앞구르기는 정당방위였다.',
    tier: '실버',
    voteNum: 19, // 벡엔드에 추가해 달라해야함
    averageRatio: 3,
  },
];

interface Props {
  voteData: IGetInGameInfoType[];
  voteCount: number;
  daysUntilEnd: number;
}

const ClaimVoteBox = ({ voteData, voteCount, daysUntilEnd }: Props) => {
  const {
    shouldBlur,
    isLogin,
    isVoteEnd,
    isNoVote,
    setIsLoginModalOpen,
    getChampionImage,
    sortedVoteData,
    getCalculatedRatio,
  } = useVoteResult({ voteCount, daysUntilEnd, voteData, DUMMY_VOTE_DATA });

  return (
    <div className={clsx('w-[659px] h-fit flex flex-col gap-[20px]')}>
      <div className={'w-full h-fit flex flex-col gap-[15px]'}>
        {sortedVoteData.map((item) => (
          <ClaimVoteItem
            key={item.inGameInfoId}
            position={item.position}
            championName={item.championName}
            tier={item.tier}
            claim={item.claim}
            ratio={getCalculatedRatio(item.voteNum)}
            voteNum={item.voteNum}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimVoteBox;
