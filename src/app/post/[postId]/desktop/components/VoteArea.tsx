import React, { useEffect, useState } from 'react';
import ChampionVoteBox from '@/app/post/_component/vote/champion/ChampionVoteBox';
import { useChampion } from '@/hooks/useChampion';
import { useCallback } from 'react';
import positions from '@/constants/positions';
import VoteForm from '@/app/post/_component/vote/VoteForm';

interface IVoteArea {
  voteData: IGetInGameInfoType[];
  isOwner: boolean;
  post: IGetPostItemType;
}

function VoteArea({ voteData, isOwner, post }: IVoteArea) {
  const { champions, loading, getImageUrlByName } = useChampion();
  const [selectedChampion, setSelectedChampion] = useState<string>('');
  const imageUrl = getImageUrlByName(name);

  const getPositionIcon = useCallback(() => {
    const positionItem = positions.find((item) => item.content === selectedChampion);
    return selectedChampion ? positionItem?.svgW : positionItem?.svg;
  }, [selectedChampion]);

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
        handleVoteSubmit={() => {
          return;
        }}
      />
    </div>
  );
}

export default VoteArea;
