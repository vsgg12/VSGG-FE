'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { voteColors } from '@/data/championData';
import usePostIdStore from '../../../store/usePostIdStore';
import ChampionImgBox from './ChampionImgBox';
import BottomBox from './BottomBox';
import { useSidebarStore } from '@/store/sidebar/useSidebarStore';

interface IVoteFormProps {
  voteInfo: IGetInGameInfoType[];
  voteCount: number;
  handleVoteSubmit: () => void;
}

export default function VoteForm({ voteInfo, handleVoteSubmit, voteCount }: IVoteFormProps) {
  const { voteResult, setVoteResult, selectedChampIdx, setSelectedChampIdx, setIsNotAbleSubmit } =
    usePostIdStore();
  const isDarkMode = useSidebarStore((state) => state.isDarkMode);
  const [isHamburgerClicked, setIsHamburgerClicked] = useState<boolean>(false);
  const [selectedChampion, setSelectedChampion] = useState<string>(voteInfo[0].championName);
  const formClass = isDarkMode ? 'bg-[#242526] text-[#F1F2F2]' : 'bg-white text-gray-850';
  const championTabClass = isDarkMode ? 'bg-[#303233]' : 'bg-white';

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
    const target = voteColors.find((pos) => pos.name === position);
    return selectedChampIdx === idx ? target?.svgw ?? '' : target?.svg ?? '';
  };

  return (
    <div
      className={`relative flex flex-col w-[719px] items-center rounded-[20px] gap-[20px] ${formClass}`}
    >
      <ChampionImgBox
        selectedChampion={selectedChampion}
        voteCount={voteCount}
        isHamburgerClicked={isHamburgerClicked}
        voteInfo={voteInfo}
      />
      {!isHamburgerClicked && (
        <div className='flex gap-[8px] absolute top-[170px] left-[20px]'>
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
                className={`${selectedChampion === champion.championName ? voteColors[index].background : championTabClass} flex items-center justify-center rounded-[10px] w-[46px] h-[49px] cursor-pointer`}
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
      )}
      <BottomBox
        voteInfo={voteInfo}
        handleVoteSubmit={handleVoteSubmit}
        isHamburgerClicked={isHamburgerClicked}
        setIsHamburgerClicked={setIsHamburgerClicked}
      />
    </div>
  );
}
