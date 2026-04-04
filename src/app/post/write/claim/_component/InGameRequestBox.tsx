import React from 'react';
import { useWriteStore } from '@/store/write/useWriteStore';
import ClaimInfoBox from '@/app/post/write/claim/_component/ClaimInfoBox';

const InGameRequestBox = () => {
  const { setInGameInfoRequestData, postRequestData } = useWriteStore();
  const { inGameInfoRequests } = postRequestData;

  const titleClass = 'font-bold text-[24px] text-[#333333]';

  return (
    <div className={'flex flex-col gap-[20px] h-[334px]'}>
      <div className={titleClass}>주장 판결</div>

      <div className={'w-full flex flex-col gap-[20px] items-center'}>
        {inGameInfoRequests.map((item, index) => (
          <>
            <ClaimInfoBox
              key={item.inGameInfoId}
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
              <div className={'text-[#8A1F21] font-bold text-[20px]'}>VS</div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default InGameRequestBox;
