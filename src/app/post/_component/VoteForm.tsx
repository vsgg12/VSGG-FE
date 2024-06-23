'use client';

import { SetStateAction, useEffect } from 'react';
import Image from 'next/image';
import { voteColors, positionInfo } from '../../../data/championData';
import VotingGraph from './VotingGraph';
import usePostIdStore from '../[postId]/store/usePostIdStore';

interface IVoteFormProps {
  voteInfo: GetAVGType[];
  setIsVoted: React.Dispatch<SetStateAction<boolean>>;
  postId: number;
}

export default function VoteForm({ voteInfo, setIsVoted, postId }: IVoteFormProps) {
  const { voteResult, setVoteResult, selectedChampIdx, setSelectedChampIdx } = usePostIdStore();

  useEffect(() => {
    setVoteResult(Array(voteInfo.length).fill(0));
  }, []);

  const getPositionSrc = (position: string) => {
    return positionInfo.find((pos) => pos.name === position)?.src ?? '';
  };

  const handleSubmit = () => {};

  return (
    //  <div className='p-content-pd p-content-rounded p-last-mb flex flex h-[313px] w-full items-center bg-white'>
    //     <div className='relative flex w-full flex-row items-center'>
    //       <Loading />
    //     </div>
    //   </div>
    <div className='p-content-pd p-content-rounded p-last-mb flex h-fit w-full flex-col bg-white'>
      <div className='relative flex w-full flex-row items-center'>
        <div className='mx-2 flex flex-col '>
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
                <p className='ml-16 text-[16px] font-semibold text-[#8A1F21]'>
                  {champion.position}
                </p>
                <div className='w-[50%]'>
                  <p className='text=[#33333] text-[14px] font-semibold'>{champion.championName}</p>
                  <p className='text=[#33333] text-[12px]'>{champion.tier}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex grow flex-col items-center justify-center'>
          <div className='mb-[3rem] text-[20px]'>이 게임의 과실은 몇 대 몇~?</div>
          <div className='flex  flex-col items-center'>
            <div className='p-content-s-mb flex flex-row'>
              {voteResult.map((vote, index) => (
                <div key={index} className='flex'>
                  <div className={voteColors[index].border + ' p-voting-number-element'}>
                    {vote}
                  </div>
                  {index !== voteInfo.length - 1 && (
                    <div className='p-voting-number-element '> : </div>
                  )}
                </div>
              ))}
            </div>
            <div className='p-content-s-mb flex flex-row'>
              <VotingGraph />
            </div>
          </div>
          <div className='text-[12px] text-[#7B7B7B]'>
            {voteInfo[selectedChampIdx].championName}의 과실을 선택해주세요
          </div>
        </div>
      </div>
      <div className='flex justify-end'>
        <button
          type='submit'
          className='h-9 w-28 rounded-full bg-[#8A1F21] text-lg text-white hover:bg-red-800'
          onClick={handleSubmit}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
