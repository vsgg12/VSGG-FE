'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { voteColors, positionInfo, mobileVoteColors } from '@/data/championData';
import VotingGraph from './VotingGraph';
import usePostIdStore from '../../[postId]/store/usePostIdStore';
import { useChampion } from '@/hooks/useChampion';
import Icon_Hamburger from '../../../../../public/svg/postItem/hamburger.svg';
import ChampionImgBox from './ChampionImgBox';

interface IVoteFormProps {
  voteInfo: IGetInGameInfoType[];
  voteCount: number;
  handleVoteSubmit: () => void;
}

export default function VoteForm({ voteInfo, handleVoteSubmit, voteCount }: IVoteFormProps) {
  const {
    voteResult,
    setVoteResult,
    selectedChampIdx,
    setSelectedChampIdx,
    isNotAbleSubmit,
    setIsNotAbleSubmit,
  } = usePostIdStore();

  const { champions, loading, getImageUrlByName } = useChampion();
  const [selectedChampion, setSelectedChampion] = useState<string>(voteInfo[0].championName);

  useEffect(() => {
    getImageUrlByName(selectedChampion);
  }, [selectedChampion]);

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
    if (selectedChampIdx === idx) {
      return mobileVoteColors.find((pos) => pos.name === position)?.svgw ?? '';
    } else {
      return mobileVoteColors.find((pos) => pos.name === position)?.svg ?? '';
    }
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
              className={`${selectedChampion === champion.championName ? voteColors[index].background : 'bg-[#ffffff]'} flex items-center justify-center rounded-[10px] w-[46px] h-[49px] cursor-pointer`}
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
      <div className='flex flex-col items-center w-[618px] h-[136px]'>
        <div className='p-content-s-mb flex'>
          <VotingGraph />
          <Image
            src={Icon_Hamburger}
            width={26}
            height={26}
            alt='hamburger'
            className='cursor-pointer'
          />
        </div>
        <div className='p-content-s-mb flex'>
          {voteResult.map((vote, index) => (
            <div key={index} className={` flex`}>
              <p className={`${voteColors[index].text} p-voting-number-element`}>{vote}</p>
              {index !== voteInfo.length - 1 && <div className='p-voting-number-element'> : </div>}
            </div>
          ))}
        </div>
        <p className='text-[12px] text-[#909090] font-bold'>
          <span className='text-[#666666]'>{voteInfo[selectedChampIdx]?.championName}</span>의
          과실을 선택해주세요
        </p>
        <div className='flex self-end '>
          <button
            className='h-[23px] w-[82px] rounded-full bg-[#8A1F21] text-[14px] text-white hover:bg-red-800 disabled:bg-[#ECECEC] disabled:text-[#828282]'
            onClick={handleVoteSubmit}
            disabled={isNotAbleSubmit}
          >
            판결하기
          </button>
        </div>
      </div>
    </div>
  );
}
