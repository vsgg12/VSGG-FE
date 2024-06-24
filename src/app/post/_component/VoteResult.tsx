'use client';

import Image from 'next/image';
import DoughnutChart from '@/components/DoughnutChart';
import usePostIdStore from '../[postId]/store/usePostIdStore';
import { voteColors, positionInfo } from '@/data/championData';
import { useEffect } from 'react';

export const inGameInfo: GetAVGType[] = [
  {
    championName: '가렌',
    averageValue: 20.5,
    position: '탑',
    tier: '아이언',
  },
  {
    championName: '노틸러스',
    averageValue: 40.5,
    position: '서폿',
    tier: '아이언',
  },
  {
    championName: '갈리오',
    averageValue: 39,
    position: '미드',
    tier: '아이언',
  },
];

interface IVoteResultProps {
  postId: number;
  voteInfos: GetAVGType[];
}

export default function VoteResult({ postId, voteInfos }: IVoteResultProps) {
  const { voteResult, setVoteResult} = usePostIdStore();

  const getPositionSrc = (position: string) => {
    return positionInfo.find((pos) => pos.name=== position)?.src ?? '';
  };

  return (
    <div className='p-content-pd p-content-rounded p-last-mb flex h-fit w-full flex-col bg-white'>
      <div className='relative flex w-full justify-between'>
      <div className='flex flex-col mx-10'>
          {voteInfos.map((champion, index) => (
            <div key={index} className="relative group">
              <div className={`${voteColors[index].background} absolute flex justify-center rounded-full w-[48px] h-[48px] cursor-pointer`}>
                  <Image
                    src={getPositionSrc(champion.position)}
                    alt='position'
                    width={24}
                    height={24}
                  />
              </div>
              <div className={`v-label flex h-[48px] cursor-pointer ${voteColors[index].border} group-hover:visible : invisible`}>
                <p className='ml-16 text-[16px] font-semibold text-[#8A1F21]'>
                  {champion.position}</p>
                <div className='w-[50%]'>
                  <p className='text=[#33333] text-[14px] font-semibold'>{champion.championName}</p>
                  <p className='text=[#33333] text-[12px]'>{champion.tier}</p>
                </div>
                </div>
              </div>
          ))}
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='mb-[50px] flex text-[20px] '>
            이 게임의 과실은 몇 대 몇 ~?
          </div>

          {voteInfos.length === 0 ? (
            <div className='flex justify-center'>아직 투표한 사람이 없는 게시글입니다.</div>
          ) : (
            <DoughnutChart voteAVGInfos={voteInfos} size='post'/>
          )}
        </div>
        <div className='flex flex-col justify-end'>
          <button
            className='h-9 w-28 rounded-full bg-[#ECECEC] text-lg text-[#828282]'
          >
            제출완료
          </button>
        </div>
      </div>
    </div>
  );
}
