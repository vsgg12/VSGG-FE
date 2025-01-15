'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { voteColors, positionInfo } from '../../../../../data/championData';
import usePostIdStore from '../../store/usePostIdStore';
import VotingGraphMobile from './VotingGraphMobile';

interface IVoteFormProps {
  voteInfo: IGetInGameInfoType[];
  handleVoteSubmit: () => void;
}

export default function VoteFormMobile({ voteInfo, handleVoteSubmit }: IVoteFormProps) {
  const {
    voteResult,
    setVoteResult,
    selectedChampIdx,
    setSelectedChampIdx,
    isNotAbleSubmit,
    setIsNotAbleSubmit,
  } = usePostIdStore();

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

  const getPositionSrc = (position: string) => {
    return positionInfo.find((pos) => pos.name === position)?.svgw ?? '';
  };

  return (
    <div className='relative flex w-full justify-around'>
      <div className='flex flex-col justify-around'>
        {voteInfo.map((champion, index) => (
          <div
            key={index}
            className='relative group'
            onClick={() => {
              setSelectedChampIdx(index);
            }}
          >
            <div
              className={`${voteColors[index].background} absolute flex justify-center rounded-full w-[48px] h-[48px] cursor-pointer`}
            >
              <Image
                src={getPositionSrc(champion.position)}
                alt='position'
                width={24}
                height={24}
              />
            </div>
            <div
              className={`v-label flex h-[48px] cursor-pointer ${voteColors[index].border} group-hover:visible ${selectedChampIdx === index ? 'visible' : 'invisible'}`}
            >
              <p className='ml-16 text-[16px] font-semibold text-[#8A1F21]'>{champion.position}</p>
              <div className='w-[50%]'>
                <p className='text=[#33333] text-[14px] font-semibold'>{champion.championName}</p>
                <p className='text=[#33333] text-[12px]'>{champion.tier}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex flex-col items-center '>
        <p className='text-[20px] mb-[10px]'>이 게임의 과실은 몇 대 몇~?</p>
        <p className='text-[12px] text-[#7B7B7B] mb-[2rem]'>
          {voteInfo[selectedChampIdx]?.championName}의 과실을 선택해주세요
        </p>
        <div className='flex flex-col items-center'>
          <div className='p-content-s-mb flex flex-row'>
            {voteResult.map((vote, index) => (
              <div key={index} className={` flex`}>
                <p className={`${voteColors[index].text} p-voting-number-element`}>{vote}</p>
                {index !== voteInfo.length - 1 && (
                  <div className='p-voting-number-element'> : </div>
                )}
              </div>
            ))}
          </div>
          <div className='p-content-s-mb flex flex-row'>
            <VotingGraphMobile />
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-end'>
        <button
          className='h-9 w-28 rounded-full bg-[#8A1F21] text-lg text-white hover:bg-red-800 disabled:bg-[#ECECEC] disabled:text-[#828282]'
          onClick={handleVoteSubmit}
          disabled={isNotAbleSubmit}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
