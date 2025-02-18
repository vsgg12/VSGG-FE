import Image from 'next/image';
import React from 'react';
import usePostIdStore from '../../store/usePostIdStore';
import { positionInfo } from '../../../../../data/championData';

interface Props {
  index: number;
  bg: string;
  champion: IGetInGameInfoType;
}

function VoteChampionItem({ index, bg, champion }: Props) {
  const { setSelectedChampIdx } = usePostIdStore();

  const getPositionSrc = (position: string) => {
    return positionInfo.find((pos) => pos.name === position)?.svgw ?? '';
  };

  return (
    <div
      className='flex flex-col relative items-center justify-center group w-[102px] h-[118px] gap-[10px]'
      onClick={() => {
        setSelectedChampIdx(index);
      }}
    >
      <div
        className={`${bg} w-[70px] h-[70px] rounded-full flex items-center justify-center cursor-pointer`}
      >
        <Image src={getPositionSrc(champion.position)} alt='position' width={32} height={32} />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-[#33333] text-[12px] font-semibold'>{champion.championName}</p>
        <p className='text-[#33333] text-[12px]'>{champion.tier}</p>
      </div>
    </div>
  );
}

export default VoteChampionItem;
