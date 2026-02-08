'use client';

import { useCallback, useMemo } from 'react';
import positions from '@/constants/positions';
import { useWriteStore } from '@/store/write/useWriteStore';
import tiers from '@/constants/tier';

interface Props {
  position: string;
  championName: string;
  tier: string;
  claim: string;
  ratio: string;
  voteNum: number;
}

const ClaimVoteItem = ({ position, championName, tier, claim, ratio, voteNum }: Props) => {
  const { allChampions } = useWriteStore();

  const getTierIcon = useCallback(() => {
    return tiers.find((item) => item.content === tier)?.svg;
  }, [tier]);

  const getPositionIcon = useCallback(() => {
    const positionItem = positions.find((item) => item.content === position);
    return positionItem?.svgW;
  }, [position]);

  // 배경 이미지 URL 찾기
  const currentBgImage = useMemo(() => {
    const champion = allChampions.find((c) => c.name === championName);
    return champion?.fullImage || '';
  }, [allChampions, championName]);

  return (
    <div
      className='relative w-[659px] h-[80px] rounded-[10px] overflow-hidden select-none'
      style={{
        backgroundImage: `url(${currentBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 20%',
      }}
    >
      {/* 투표율 바 */}
      <div
        className='absolute top-0 left-0 h-full bg-[#8A1F21]/40 z-20 transition-all duration-500 ease-out'
        style={{ width: `${ratio}%` }}
      />

      {/* 텍스트 컨텐츠 */}
      <div className='relative z-30 w-full h-full flex justify-between items-center px-[20px] py-[10px] text-white'>
        {/* 왼쪽: 챔피언 정보 및 주장 */}
        <div className='flex flex-col justify-center gap-2 w-[80%]'>
          {/* 상단: 포지션 아이콘 + 챔피언명 + 티어 */}
          <div className='flex items-center gap-2 text-[12px] opacity-80 font-medium'>
            <div className='w-[16px] h-[16px] flex items-center justify-center'>
              {getPositionIcon()}
            </div>
            <span className={'font-semibold text-[16px] text-[#D9D9D9]'}>{championName}</span>
            <span className={'w-[12px] h-[12px]'}>{getTierIcon()}</span>
            <span className='text-[#51484A]'>{tier}</span>
          </div>

          {/* 하단: 주장 */}
          <div className='text-[18px] font-bold leading-tight truncate pr-4 drop-shadow-md'>
            {claim}
          </div>
        </div>

        {/* 오른쪽: 득표율 및 투표 수 */}
        <div className='flex flex-col items-end justify-center shrink-0 font-semibold gap-1.5'>
          <span className='text-[24px] leading-none'>{ratio}%</span>
          <span className='text-[12px]'>{voteNum}표</span>
        </div>
      </div>
    </div>
  );
};

export default ClaimVoteItem;
