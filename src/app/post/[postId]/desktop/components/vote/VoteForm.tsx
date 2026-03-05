'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { mobileVoteColors } from '@/data/championData';
import usePostIdStore from '../../../store/usePostIdStore';
import ChampionImgBox from './ChampionImgBox';
import GraphBox from './GraphBox';

interface IVoteFormProps {
  voteInfo: IGetInGameInfoType[];
  voteCount: number;
  handleVoteSubmit: () => void;
}

export default function VoteForm({ voteInfo, handleVoteSubmit, voteCount }: IVoteFormProps) {
  const { voteResult, setVoteResult, selectedChampIdx, setSelectedChampIdx, setIsNotAbleSubmit } =
    usePostIdStore();

  const [selectedChampion, setSelectedChampion] = useState<string>(voteInfo[0].championName);

  useEffect(() => {
    setVoteResult(Array(voteInfo.length).fill(0));
  }, [setVoteResult, voteInfo.length]);

  useEffect(() => {
    const sum = voteResult.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

    if (sum === 10) {
      setIsNotAbleSubmit(false);
    } else {
      setIsNotAbleSubmit(true);
    }
  }, [voteResult, setIsNotAbleSubmit]);

  const getPositionSrc = (position: string, idx: number) => {
    const target = mobileVoteColors.find((pos) => pos.name === position);
    return selectedChampIdx === idx ? target?.svgw ?? '' : target?.svg ?? '';
  };

  return (
    <div className='relative flex flex-col w-[719px] p-[30px] items-center rounded-[20px] bg-[#ffffff] gap-[20px]'>
      <ChampionImgBox selectedChampion={selectedChampion} voteCount={voteCount} />
      <div className='flex gap-[8px] absolute top-[200px] left-[50px]'>
        {voteInfo.map((champion, index) => (
          <div
            key={index}
            className='relative group'
            onClick={() => {
              setSelectedChampIdx(index);
              setSelectedChampion(champion.championName);
            }}
          >
            <div
              className={`${selectedChampion === champion.championName ? mobileVoteColors[index].background : 'bg-[#ffffff]'} flex items-center justify-center rounded-[10px] w-[46px] h-[49px] cursor-pointer`}
            >
              <Image
                src={getPositionSrc(champion.position, index)}
                alt='position'
                width={26}
                height={26}
              />
            </div>
          </div>
        ))}
      </div>
      <GraphBox voteInfo={voteInfo} handleVoteSubmit={handleVoteSubmit} />
    </div>
  );
}
