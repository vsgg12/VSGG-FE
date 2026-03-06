import Image from 'next/image';
import React from 'react';
import { useChampion } from '@/hooks/useChampion';
import IconVote from '../../../../../../../public/svg/postItem/vote.svg';

interface IProps {
  selectedChampion: string;
  voteCount: number;
  isHamburgerClicked: boolean;
}

export default function ChampionImgBox({ selectedChampion, voteCount }: IProps) {
  const { getImageUrlByName } = useChampion();

  return (
    <div className='flex flex-col gap-[13px]'>
      <div className='flex text-[14px] font-semibold gap-[5px]'>
        <Image src={IconVote} width={24} height={24} alt='vote' />
        <p>판결 {voteCount <= 999 ? voteCount : '+999'}</p>
      </div>
      <div className='relative w-[659px] h-[201px] rounded-[20px] overflow-hidden'>
        <Image
          src={getImageUrlByName(selectedChampion)}
          alt='champion'
          fill
          className='object-cover'
        ></Image>
      </div>
    </div>
  );
}
