import Image from 'next/image';
import React from 'react';
import usePostIdStore from '../../store/usePostIdStore';
import { mobileVoteColors } from '../../../../../data/championData';

interface Props {
  index: number;
  champion: IGetInGameInfoType;
}

function VoteChampionItem({ index, champion }: Props) {
  const { setSelectedChampIdx, selectedChampIdx } = usePostIdStore();

  const getPositionSrc = (position: string, type: string) => {
    switch (type) {
      case 'icon_default':
        return mobileVoteColors.find((pos) => pos.name === position)?.svg ?? '';
      case 'icon_selected':
        return mobileVoteColors.find((pos) => pos.name === position)?.svgw ?? '';
      case 'background':
        return mobileVoteColors.find((pos) => pos.name === position)?.background ?? '';
      case 'border':
        return mobileVoteColors.find((pos) => pos.name === position)?.border ?? '';
      default:
        return '';
    }
  };

  const colorData =
    selectedChampIdx === index
      ? `${getPositionSrc(champion.position!, 'background')}`
      : ` ${getPositionSrc(champion.position!, 'border')} bg-white border-[2px]`;

  return (
    <div
      className='flex flex-col relative items-center justify-center group w-[102px] h-[118px] gap-[10px]'
      onClick={() => {
        setSelectedChampIdx(index);
      }}
    >
      <div
        className={`${colorData} w-[70px] h-[70px] rounded-full flex items-center justify-center cursor-pointer`}
      >
        <Image
          src={
            selectedChampIdx === index
              ? getPositionSrc(champion.position!, 'icon_selected')
              : getPositionSrc(champion.position!, 'icon_default')
          }
          alt='position'
          width={32}
          height={32}
        />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-[#333333] text-[12px] font-semibold'>{champion.championName}</p>
        <p className='text-[#333333] text-[12px]'>{champion.tier}</p>
      </div>
    </div>
  );
}

export default VoteChampionItem;
