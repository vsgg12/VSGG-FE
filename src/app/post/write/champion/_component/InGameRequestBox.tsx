import React from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import ChampionInfoBox from '@/app/post/write/champion/_component/ChampionInfoBox';

const InGameRequestBox = () => {
  const { setInGameInfoRequestData, postAddRequest } = useWriteStore();
  const { inGameInfoRequests } = postAddRequest;

  const titleClass = 'font-bold text-[24px] text-semantic-text-primary';

  return (
    <div className={'flex flex-col gap-[20px] h-[334px]'}>
      <div className={titleClass}>주장 판결</div>

      <div className={'w-full flex flex-col gap-[20px] items-center'}>
        {inGameInfoRequests.map((item, index) => (
          <>
            <ChampionInfoBox
              key={item.inGameInfoId ?? index}
              championName={item.championName}
              setChampionName={(value) => setInGameInfoRequestData(index, 'championName', value)}
              tier={item.tier}
              setTier={(value) => setInGameInfoRequestData(index, 'tier', value)}
              position={item.position}
              setPosition={(value) => setInGameInfoRequestData(index, 'position', value)}
              claim={item.claim || ''}
              setClaim={(value) => setInGameInfoRequestData(index, 'claim', value)}
            />

            {index < inGameInfoRequests.length - 1 && (
              <div className={'text-primary-500 font-bold text-[20px]'}>VS</div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default InGameRequestBox;
