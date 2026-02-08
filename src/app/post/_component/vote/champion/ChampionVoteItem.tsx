'use client';

import tiers from '@/constants/tier';
import { useCallback } from 'react';
import positions from '@/constants/positions';
import { clsx } from 'clsx';
import hexagon from '../../../../../../public/svg/vote/hexagon.svg';
import Image from 'next/image';

interface Props {
  position: string;
  championName: string;
  tier: string;
  averageRatio: string; // 비율
  isHover: boolean;
}

const ChampionVoteItem = ({ position, championName, tier, averageRatio, isHover }: Props) => {
  const getTierIcon = useCallback(() => {
    return tiers.find((item) => item.content === tier)?.svg;
  }, [tier]);

  const getPositionIcon = useCallback(() => {
    const positionItem = positions.find((item) => item.content === position);
    return isHover ? positionItem?.svgW : positionItem?.svg;
  }, [position, isHover]);

  return (
    // [수정 1] w-fit -> w-full 로 변경하고 justify-between 추가
    <div className={'w-full h-fit flex justify-between font-semibold items-center cursor-default'}>
      {/* [수정 2] 왼쪽 요소(아이콘 + 텍스트)를 하나의 div로 묶음 */}
      <div className='flex items-center gap-[10px]'>
        {/* 포지션 */}
        <div
          className={
            'w-[25px] h-[25px] rounded-[12.5px] bg-white/15 flex justify-center items-center shrink-0'
          }
        >
          {getPositionIcon()}
        </div>

        {/*챔피언, 티어 정보*/}
        <div className={'flex flex-col'}>
          <div
            className={clsx(
              'text-[16px] whitespace-nowrap',
              isHover ? 'text-[#D9D9D9]' : 'text-[#555555]',
            )}
          >
            {championName}
          </div>
          <div className={'flex gap-[5px] items-center'}>
            <div className={'w-[12px] h-[12px] flex justify-items-center'}>{getTierIcon()}</div>
            <div className={clsx('text-[10px]', isHover ? 'text-[#DDDDDD]' : 'text-[#51484A]')}>
              {tier}
            </div>
          </div>
        </div>
      </div>

      {/* 육각형 */}
      <div className={clsx('w-[50px] h-[50px] relative justify-center items-center flex shrink-0')}>
        <Image src={hexagon} alt={'육각형 이미지'} className={'absolute'} />
        <span className='relative z-10 text-white text-[18px] flex items-center justify-center line-clamp-0'>
          {averageRatio}
        </span>
      </div>
    </div>
  );
};

export default ChampionVoteItem;
