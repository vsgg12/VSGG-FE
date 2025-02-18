'use client';

import { useEffect } from 'react';
import { voteColors } from '../../../../../data/championData';
import usePostIdStore from '../../store/usePostIdStore';
import VotingGraphMobile from './VotingGraphMobile';
import VoteChampionItem from './VoteChampionItem';

interface IVoteFormProps {
  voteInfo: IGetInGameInfoType[];
  handleVoteSubmit: () => void;
}

export default function VoteFormMobile({ voteInfo, handleVoteSubmit }: IVoteFormProps) {
  const { voteResult, setVoteResult, selectedChampIdx, isNotAbleSubmit, setIsNotAbleSubmit } =
    usePostIdStore();

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

  return (
    <div className='relative flex flex-col w-full justify-around gap-[40px]'>
      <div className='w-full ju'>
        {voteInfo.length <= 3 ? (
          <div className='flex w-full justify-around'>
            {voteInfo.map((champion, index) => (
              <div key={index}>
                <VoteChampionItem
                  index={index}
                  bg={voteColors[index].background}
                  champion={champion}
                />
              </div>
            ))}
          </div>
        ) : voteInfo.length === 4 ? (
          <div className='grid grid-cols-2'>
            {voteInfo.map((champion, index) => (
              <div key={index} className='flex justify-center mb-[10px]'>
                <VoteChampionItem
                  index={index}
                  bg={voteColors[index].background}
                  champion={champion}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center gap-5'>
            <div className='flex w-full justify-around'>
              {voteInfo.slice(0, 3).map((champion, index) => (
                <div key={index}>
                  <VoteChampionItem
                    index={index}
                    bg={voteColors[index].background}
                    champion={champion}
                  />
                </div>
              ))}
            </div>
            <div className='flex w-full px-[50px] justify-around'>
              {voteInfo.slice(3, 5).map((champion, index) => (
                <div key={index}>
                  <VoteChampionItem
                    index={index + 3}
                    bg={voteColors[index + 3].background}
                    champion={champion}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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
          className='h-[20px] w-[80px] rounded-full bg-[#8A1F21] text-[15px] text-white hover:bg-red-800 disabled:bg-[#ECECEC] disabled:text-[#828282]'
          onClick={handleVoteSubmit}
          disabled={isNotAbleSubmit}
        >
          제출하기
        </button>
      </div>
    </div>
  );
}
