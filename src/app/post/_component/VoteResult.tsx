'use client';

import Image from 'next/image';
import DoughnutChart from '@/components/DoughnutChart';
// import usePostIdStore from '../[postId]/store/usePostIdStore';
import { voteColors, positionInfo } from '@/data/championData';

interface IVoteResultProps {
  voteInfos: IGetInGameInfoType[] | undefined;
  isOwner: boolean;
}

export default function VoteResult({ voteInfos, isOwner }: IVoteResultProps) {
  const getPositionSrc = (position: string) => {
    return positionInfo.find((pos) => pos.name === position)?.svgw ?? '';
  };

  return (
    <>
      {voteInfos && (
        <>
          <div className='p-content-pd p-content-rounded p-last-mb flex h-fit w-full flex-col bg-white'>
            <div className='relative flex w-full justify-between'>
              <div className='flex flex-col ml-10 justify-around'>
                {voteInfos.map((champion, index) => (
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
                    <div className={`group-hover:visible : invisible flex`}>
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
                      <p className={`text-[#8A1F21] gitd self-center mb-1 font-[14px]`}>
                        과실 {champion.averageRatio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col items-center justify-center mr-5'>
                <div className='mb-[20px] flex text-[20px] '>이 게임의 과실은 몇 대 몇 ~?</div>
                {isOwner && voteInfos?.every((voteInfo) => voteInfo.averageRatio === 0) ? (
                  <div className='flex justify-center text-[#828282] mt-8 mb-10'>
                    아직 투표한 사람이 없는 게시글입니다.
                  </div>
                ) : (
                  <DoughnutChart voteInfos={voteInfos} size='post' />
                )}
              </div>
              <div className='flex flex-col justify-end mr-10'>
                {!isOwner && (
                  <button className='h-9 w-28 rounded-full bg-[#ECECEC] text-lg text-[#828282]'>
                    제출완료
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
