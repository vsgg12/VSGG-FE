import Image from 'next/image';
import React from 'react';
import { useChampion } from '@/hooks/useChampion';
import IconVote from '../../../../../../../public/svg/postItem/vote.svg';
import Loading from '@/components/Loading';

interface IProps {
  selectedChampion: string;
  voteCount: number;
  isHamburgerClicked: boolean;
  voteInfo: IGetInGameInfoType[];
}

export default function ChampionImgBox({
  selectedChampion,
  voteCount,
  isHamburgerClicked,
  voteInfo,
}: IProps) {
  const { getImageUrlByName, loading } = useChampion();

  return (
    <div className='flex flex-col gap-[13px] w-full'>
      <div className='flex text-[14px] font-semibold gap-[5px]'>
        <Image src={IconVote} width={24} height={24} alt='vote' />
        <p>판결 {voteCount <= 999 ? voteCount : '+999'}</p>
      </div>
      {isHamburgerClicked ? (
        <div className='flex relative w-full h-fit min-w-[145px] min-h-[201px] rounded-[20px] overflow-hidden'>
          {loading ? (
            <Loading />
          ) : (
            voteInfo.map((champion) => (
              <div
                style={{ width: `${100 / voteInfo.length}%`, height: '201px' }}
                className='relative'
                key={champion.championName}
              >
                <Image
                  src={getImageUrlByName(champion.championName)}
                  alt='champion'
                  fill
                  className='object-cover'
                />
              </div>
            ))
          )}
        </div>
      ) : (
        <div className='relative w-full h-fit min-w-[145px] min-h-[201px] rounded-[20px] overflow-hidden'>
          {loading ? (
            <Loading />
          ) : (
            <Image
              src={getImageUrlByName(selectedChampion, 'flash')}
              alt='champion'
              fill
              className='object-cover object-top'
            ></Image>
          )}
        </div>
      )}
    </div>
  );
}
