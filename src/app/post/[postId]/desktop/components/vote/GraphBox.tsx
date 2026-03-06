import VotingGraph from '@/app/post/[postId]/desktop/components/vote/VotingGraph';
import Image from 'next/image';
import React from 'react';
import { voteColors } from '@/data/championData';
import Icon_Hamburger from '../../../../../../../public/svg/postItem/hamburger.svg';
import usePostIdStore from '../../../store/usePostIdStore';

interface IProps {
  voteInfo: IGetInGameInfoType[];
  handleVoteSubmit: () => void;
}

export default function GraphBox({ voteInfo, handleVoteSubmit }: IProps) {
  const { voteResult, isNotAbleSubmit, selectedChampIdx } = usePostIdStore();

  return (
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
        <span className='text-[#666666]'>{voteInfo[selectedChampIdx]?.championName}</span>의 과실을
        선택해주세요
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
  );
}
