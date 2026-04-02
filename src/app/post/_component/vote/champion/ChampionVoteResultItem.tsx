'use client';

import tiersData from '@/constants/tier';
import { useCallback } from 'react';
import positions from '@/constants/positions';
import { clsx } from 'clsx';
import hexagon from '../../../../../../public/svg/vote/hexagon.svg';
import hexagonDisable from '../../../../../../public/svg/vote/hexagonDisable.svg';
import Image from 'next/image';

interface Props {
  position: string;
  championName: string;
  tier: string;
  averageRatio: string; // 비율
  isHover: boolean;
}

const ChampionVoteResultItem = ({ position, championName, tier, averageRatio, isHover }: Props) => {
  const { tiers } = tiersData;
  const getTierIcon = useCallback(() => {
    return tiers.find((item) => item.content === tier)?.svg;
  }, [tier]);

  const getPositionIcon = useCallback(() => {
    const positionItem = positions.find((item) => item.content === position);
    return isHover ? positionItem?.svgW : positionItem?.svg;
  }, [position, isHover]);

  return (
    <div className={'w-full h-fit flex justify-between font-semibold items-center cursor-pointer'}>
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
        <Image
          src={isHover ? hexagon : hexagonDisable}
          alt={'육각형 이미지'}
          className={'absolute'}
        />
        <span
          className={clsx(
            'relative z-10 text-[18px] flex items-center justify-center line-clamp-0',
            isHover ? 'text-white' : 'text-white/60',
          )}
        >
          {averageRatio}
        </span>
      </div>
    </div>
  );
};

export default ChampionVoteResultItem;
