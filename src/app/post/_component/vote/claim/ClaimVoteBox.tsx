'use client';

import { clsx } from 'clsx';
import { useMemo } from 'react';
import ClaimVoteItem from '@/app/post/_component/vote/claim/ClaimVoteItem';

const DUMMY_VOTE_DATA = [
  {
    inGameInfoId: 1,
    position: '미드',
    championName: '트위스티드 페이트',
    championImage: `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/TwistedFate.png`,
    claim: '탑 라인을 안 밀고 집에 갔어야 했다. 이건 명백한 판단 미스다.',
    tier: 'GOLD',
    voteNum: 99, // 백엔드에서 averageRatio 삭제하고 추가로 줘야함
  },
  {
    inGameInfoId: 2,
    position: '원딜',
    championName: '베인',
    championImage: `https://ddragon.leagueoflegends.com/cdn/15.24.1/img/champion/Vayne.png`,
    claim: '서폿이 안 지켜줘서 죽은 거다. 앞구르기는 정당방위였다.',
    tier: 'SILVER',
    voteNum: 25, // 백엔드에서 averageRatio 삭제하고 추가로 줘야함
  },
];

interface Props {
  voteData?: IGetInGameInfoType[];
  voteCount: number;
  isVote: boolean;
}

const ClaimVoteBox = ({ voteData, voteCount, isVote }: Props) => {
  const isNoVote: boolean = voteCount === 0;

  const getRatio = (voteNum: number) => {
    if (voteCount === 0) return 0;
    return (voteNum / voteCount) * 100;
  };

  // 득표수 내림차순 정렬
  const sortedVoteData = useMemo(() => {
    return [...DUMMY_VOTE_DATA].sort((a, b) => b.voteNum - a.voteNum);
  }, []);

  return (
    <div className={clsx('w-[659px] h-fit flex flex-col gap-[20px]')}>
      <div className={'w-full h-fit flex flex-col justify-between'}>
        {sortedVoteData.map((item) => (
          <ClaimVoteItem
            key={item.inGameInfoId}
            position={item.position}
            championImage={item.championImage}
            championName={item.championName}
            claim={item.claim}
            ratio={getRatio(item.voteNum).toFixed(1)}
            voteNum={item.voteNum}
          />
        ))}
      </div>
    </div>
  );
};

export default ClaimVoteBox;
