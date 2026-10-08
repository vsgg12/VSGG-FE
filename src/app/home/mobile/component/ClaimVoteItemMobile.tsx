'use client';

import { useCallback, useMemo } from 'react';
import positions from '@/constants/positions';
import { useWriteStore } from '@/store/write/useWriteStore';
import tiersData from '@/constants/tier';

interface Props {
  voteItem: IGetInGameInfoType;
  onVoteItemClick: () => void; // 투표 item 클릭 시 투표 api 호출
  isHome?: boolean;
}

const ClaimVoteItemMobile = ({ voteItem, onVoteItemClick, isHome = false }: Props) => {
  const { allChampions } = useWriteStore();
  const { tiers } = tiersData;

  const getTierIcon = useCallback(() => {
    return tiers.find((item) => item.content === voteItem.tier)?.svg;
  }, [tiers, voteItem.tier]);

  const getPositionIcon = useCallback(() => {
    const positionItem = positions.find((item) => item.content === voteItem.position);
    return positionItem?.svgW;
  }, [voteItem.position]);

  // 배경 이미지 URL 찾기
  const currentBgImage = useMemo(() => {
    const champion = allChampions.find((c) => c.name === voteItem.championName);
    return champion?.fullImage || '';
  }, [allChampions, voteItem.championName]);

  return (
    <div
      className={`relative rounded-[10px] overflow-hidden w-full h-[90px]}`}
      style={{
        backgroundImage: `url(${currentBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 10%',
      }}
      onClick={onVoteItemClick}
    >
      {/* 투표율 바 */}
      <div
        className='absolute top-0 left-0 h-full bg-primary-500/40 z-20 transition-all duration-500 ease-out'
        style={{ width: `${voteItem.averageRatio}%` }}
      />

      {/* 텍스트 컨텐츠 */}
      <div className='relative z-30 w-full h-full flex justify-between items-center px-[20px] py-[10px] text-white'>
        {/* 왼쪽: 챔피언 정보 및 주장 */}
        <div className='flex flex-col justify-center gap-2 w-[80%]'>
          {/* 상단: 포지션 아이콘 + 챔피언명 + 티어 */}
          <div className='flex items-center gap-2 opacity-80 font-medium'>
            <div className='w-[16px] h-[16px] flex items-center justify-center'>
              {getPositionIcon()}
            </div>
            <span
              className={`${isHome ? 'text-[16px]' : 'text-[16px]'} 'font-semibold text-[16px] text-gray-100'`}
            >
              {voteItem.championName}
            </span>
            <span className={'w-[12px] h-[12px]'}>{getTierIcon()}</span>
            <span className='text-[10px] text-tier-iron'>{voteItem.tier}</span>
          </div>

          {/* 하단: 주장 */}
          <div className=' text-[16px] font-bold leading-tight truncate pr-4 drop-shadow-md'>
            {voteItem.claim}
          </div>
        </div>

        {/* 오른쪽: 득표율 및 투표 수 */}
        <div className='flex flex-col items-end justify-center shrink-0 font-semibold gap-1.5'>
          <span className={`${isHome ? 'text-[18px]' : 'text-[20px]'} 'leading-none'`}>
            {voteItem.averageRatio}
            <span className='text-[12px]'>%</span>
          </span>
          <span className='text-[12px]'>{voteItem.voteCount}표</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimVoteItemMobile;
