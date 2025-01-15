'use client';

import Image from 'next/image';
import { voteColors, positionInfo } from '@/data/championData';
import Doughnut from '../../../../../../public/svg/Doughnut_Big.svg';
import { useEffect, useState } from 'react';
import DoughnutChart from '@/components/DoughnutChart';

interface IVoteResultProps {
  voteInfos: IGetInGameInfoType[] | undefined;
  isOwner: boolean;
  isFinished: boolean;
}

export default function VoteResultMobile({ voteInfos, isOwner, isFinished }: IVoteResultProps) {
  const [isNoOneVoted, setIsNoOneVoted] = useState<boolean>(false);
  const [votes, setVotes] = useState<IGetInGameInfoType[]>();
  useEffect(() => {
    if (voteInfos) {
      const filterVotes = voteInfos.filter((voteInfo) => voteInfo.averageRatio === 0);
      setVotes(filterVotes);
    }
  }, [voteInfos]);

  useEffect(() => {
    if (votes && voteInfos && voteInfos.length === votes.length) {
      setIsNoOneVoted(true);
    }
  }, [votes]);

  const getPositionSrc = (position: string) => {
    if (voteInfos?.every((voteInfo) => voteInfo.averageRatio === 0)) {
      return positionInfo.find((pos) => pos.name === position)?.svgDisabled ?? '';
    } else {
      return positionInfo.find((pos) => pos.name === position)?.svgw ?? '';
    }
  };

  return (
    <div>
      {voteInfos && (
        <div className='w-full'>
          <div className='flex flex-col ml-10 justify-around'>
            {(isOwner && isNoOneVoted) || (!isOwner && isNoOneVoted && isFinished) ? (
              <div></div>
            ) : (
              // (
              //   voteInfos.map((champion, index) => (
              //     <div key={index} className='relative group'>
              //       <div
              //         className={`bg-[#ECECEC] absolute flex justify-center rounded-full w-[48px] h-[48px]`}
              //       >
              //         <Image
              //           src={getPositionSrc(champion.position)}
              //           alt='position'
              //           width={24}
              //           height={24}
              //         />
              //       </div>
              //     </div>
              //   ))
              // ) :
              voteInfos.map((champion, index) => (
                <div key={index} className='relative group'>
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
                  <div className={`flex`}>
                    <div
                      className={`v-label flex h-[48px] cursor-pointer ${voteColors[index].border}`}
                    >
                      <p className='ml-16 text-[16px] font-semibold text-[#8A1F21]'>
                        {champion.position}
                      </p>
                      <div className='w-[50%]'>
                        <p className='text=[#33333] text-[14px] font-semibold'>
                          {champion.championName}
                        </p>
                        <p className='text=[#33333] text-[12px]'>{champion.tier}</p>
                      </div>
                    </div>
                    <p className={`text-[#8A1F21] gitd self-center mb-1 text-[14px]`}>
                      과실 {champion.averageRatio}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='mb-[20px] text-[20px]'>이 게임의 과실은 몇 대 몇 ~?</p>
            {(isOwner && isNoOneVoted) ||
            (!isOwner && isNoOneVoted && isFinished) ||
            (isOwner && isNoOneVoted && isFinished) ? (
              <div className='flex relative justify-center w-full'>
                <p className='flex justify-center items-center absolute text-[15px] inset-0 text-[#828282]'>
                  {isFinished
                    ? '투표한 사람이 없는 게시글입니다.'
                    : '아직 투표한 사람이 없는 게시글입니다.'}
                </p>
                <Image className='mr-7' src={Doughnut} width={150} height={150} alt='noVote' />
              </div>
            ) : (
              <DoughnutChart voteInfos={voteInfos} size='post' />
            )}
          </div>

          <div className='flex flex-col justify-end mr-10'>
            {isFinished
              ? null
              : !isOwner && (
                  <button className='h-9 w-28 rounded-full bg-[#ECECEC] text-lg text-[#828282]'>
                    제출완료
                  </button>
                )}
          </div>
        </div>
      )}
    </div>
  );
}
