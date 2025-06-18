'use client';

import Image from 'next/image';
// import { positionInfo } from '@/data/championData';
import Doughnut from '../../../../../../public/svg/Doughnut_Big.svg';
import { useEffect, useState } from 'react';
import DoughnutChart from '@/components/DoughnutChart';
import VoteChampionItem from './VoteChampionItem';
import { voteColors } from '@/data/championData';

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

  // const getPositionSrc = (position: string) => {
  //   if (voteInfos?.every((voteInfo) => voteInfo.averageRatio === 0)) {
  //     return positionInfo.find((pos) => pos.name === position)?.svgDisabled ?? '';
  //   } else {
  //     return positionInfo.find((pos) => pos.name === position)?.svgw ?? '';
  //   }
  // };

  return (
    <div>
      {voteInfos && (
        <div className='w-full'>
          <div className='flex flex-col ml-10 justify-around mb-[100px]'>
            {(isOwner && isNoOneVoted) || (!isOwner && isNoOneVoted && isFinished) ? (
              <div></div>
            ) : voteInfos.length <= 3 ? (
              <div className='flex w-full justify-around'>
                {voteInfos.map((champion, index) => (
                  <div key={index}>
                    <VoteChampionItem index={index} champion={champion} isResult={true} />
                  </div>
                ))}
              </div>
            ) : voteInfos.length === 4 ? (
              <div className='grid grid-cols-2'>
                {voteInfos.map((champion, index) => (
                  <div key={index} className='flex justify-center mb-[10px]'>
                    <VoteChampionItem index={index} champion={champion} isResult={true} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-col justify-center items-center gap-5'>
                <div className='flex w-full justify-around'>
                  {voteInfos.slice(0, 3).map((champion, index) => (
                    <div key={index}>
                      <VoteChampionItem index={index} champion={champion} isResult={true} />
                    </div>
                  ))}
                </div>
                <div className='flex w-full px-[50px] justify-around'>
                  {voteInfos.slice(3, 5).map((champion, index) => (
                    <div key={index}>
                      <VoteChampionItem index={index + 3} champion={champion} isResult={true} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex flex-col items-center justify-center'>
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
              <div className='flex items-center gap-[50px]'>
                <div className='flex flex-col gap-[10px]'>
                  {voteInfos.map(
                    (champion, index) =>
                      index % 2 === 0 && (
                        <div key={index} className='flex items-center gap-[10px]'>
                          <div
                            className={`${voteColors[index].background} w-[12px] h-[12px] rounded-full`}
                          ></div>
                          <p className='font-[12px] text-[#333333]'>{champion.championName}</p>
                        </div>
                      ),
                  )}
                </div>
                <DoughnutChart voteInfos={voteInfos} size='post' isMobile={true} />
                <div className='flex flex-col gap-[10px]'>
                  {voteInfos.map(
                    (champion, index) =>
                      index % 2 === 1 && (
                        <div key={index} className='flex items-center justify-end gap-[10px]'>
                          <p className='font-[12px] text-[#333333]'>{champion.championName}</p>
                          <div
                            className={`${voteColors[index].background} w-[12px] h-[12px] rounded-full`}
                          ></div>
                        </div>
                      ),
                  )}
                </div>{' '}
              </div>
            )}
          </div>
          <div className='flex flex-col mt-[20px] justify-self-end'>
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
