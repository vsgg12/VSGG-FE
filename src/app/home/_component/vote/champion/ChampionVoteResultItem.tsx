'use client';

import tiersData from '@/constants/tier';
import { useCallback } from 'react';
import positions from '@/constants/positions';
import { clsx } from 'clsx';
import hexagon from '../../../../../../public/svg/vote/hexagon.svg';
import hexagonDisable from '../../../../../../public/svg/vote/hexagonDisable.svg';
import Image from 'next/image';

interface Props {
  isHover: boolean;
  voteItem: IGetInGameInfoType;
  isHome?: boolean;
}

const ChampionVoteResultItem = ({ voteItem, isHover, isHome = false }: Props) => {
  const { tiers } = tiersData;
  const getTierIcon = useCallback(() => {
    return tiers.find((item) => item.content === voteItem.tier)?.svg;
  }, [voteItem.tier, tiers]);

  const getPositionIcon = useCallback(() => {
    const positionItem = positions.find((item) => item.content === voteItem.position);
    return isHover ? positionItem?.svgW : positionItem?.svg;
  }, [voteItem.position, isHover]);

  return (
    <div
      className={clsx(
        'flex justify-between font-semibold items-center cursor-pointer',
        isHome ? 'w-[256px] h-[33px]' : 'w-full h-fit',
      )}
    >
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
              'whitespace-nowrap',
              isHover ? 'text-[#D9D9D9]' : 'text-[#555555]',
              isHome ? 'text-[12px]' : 'text-[16px]',
            )}
          >
            {voteItem.championName}
          </div>
          <div className={'flex gap-[5px] items-center'}>
            <div className={'w-[12px] h-[12px] flex justify-items-center'}>{getTierIcon()}</div>
            <div className={clsx('text-[10px]', isHover ? 'text-[#DDDDDD]' : 'text-[#51484A]')}>
              {voteItem.tier}
            </div>
          </div>
        </div>
      </div>
      {/* 육각형 */}
      <div
        className={clsx(
          'relative justify-center items-center flex shrink-0',
          isHome ? 'w-[33px] h-[33px]' : 'w-[50px] h-[50px]',
        )}
      >
        <Image
          src={isHover ? hexagon : hexagonDisable}
          alt={'육각형 이미지'}
          className={'absolute'}
        />
        <span
          className={clsx(
            'relative z-10 flex items-center justify-center line-clamp-0',
            isHover ? 'text-white' : 'text-white/60',
            isHome ? 'text-[14px]' : 'text-[18px]',
          )}
        >
          {(voteItem.averageRatio ?? 0).toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default ChampionVoteResultItem;
