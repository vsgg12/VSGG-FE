'use client';

import Image from 'next/image';
import topWSVG from '../../../../public/svg/top-w.svg';
import midWSVG from '../../../../public/svg/mid-w.svg';
import jungleWSVG from '../../../../public/svg/jungle-w.svg';
import onedealWSVG from '../../../../public/svg/onedeal-w.svg';
import supportWSVG from '../../../../public/svg/supporter-w.svg';
import DoughnutChart from '@/components/DoughnutChart';

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
  const changeIngameInfoColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-[#000000]';
      case 1:
        return 'bg-[#9D2A2C]';
      case 2:
        return 'bg-[#CACACA]';
      case 3:
        return 'bg-[#656565]';
      case 4:
        return 'bg-[#6C0000]';
    }
  };

  const changeVoteInfoBorderColor = (index: number) => {
    switch (index) {
      case 0:
        return 'border-[#000000]';
      case 1:
        return 'border-[#9D2A2C]';
      case 2:
        return 'border-[#CACACA]';
      case 3:
        return 'border-[#656565]';
      case 4:
        return 'border-[#6C0000]';
    }
  };

  const changePositionName = (position: string) => {
    
  };


  const changePostionSVG = (position: string) => {
    switch (position) {
      case 'TOP':
        return <Image alt='top' src={topWSVG} />;
      case 'ADCARRY':
        return <Image alt='top' src={onedealWSVG} />;
      case 'MID':
        return <Image alt='top' src={midWSVG} />;
      case 'JUNGLE':
        return <Image alt='JUNGLE' src={jungleWSVG} />;
      case 'SUPPORT':
        return <Image alt='top' src={supportWSVG} />;
    }
  };

  return (
    <div className='p-content-pd p-content-rounded p-last-mb flex h-fit w-full flex-col bg-white'>
      <div className='flex items-center'>
        <div className='flex w-[40%] flex-col'>
          {voteInfos.map((gameInfo, index: number) => (
            <div key={index} className='flex w-full items-center '>
              <label
                className={'v-label ' + changeVoteInfoBorderColor(index)}
              >
                <div
                  className={
                    changeIngameInfoColor(index) +
                    ' flex h-[48px] w-[48px] items-center justify-center rounded-full'
                  }
                >
                  {changePostionSVG(gameInfo.position)}
                  {/* {changePostionSVG('TOP')} */}
                </div>
                <div className='mx-[10px] text-[16px] font-semibold text-[#8A1F21]'>
                  positionName
                  {/* {changePositionName('TOP')} */}
                </div>
                <div className='w-[50%]'>
                  <div className='text=[#33333] text-[14px] font-semibold'>
                    {gameInfo.championName}
                  </div>
                  <div className='text=[#33333] text-[12px]'>
                    changeTierName(gameInfo.tier)
                    {/* {'DIAMOND'} */}
                  </div>
                </div>
              </label>
              <div className='text-[#8A1F21]'>과실 voteInfos.averageValue</div>
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center justify-center'>
          <div className='mb-[50px]  flex text-[20px] '>
            이 게임의 과실은 몇 대 몇 ~?
            <div className='ml-[10px] text-[#8f8f8f]'>(전체 평균)</div>
          </div>

          {voteInfos.length === 0 ? (
            <div className='flex justify-center'>아직 투표한 사람이 없는 게시글입니다.</div>
          ) : (
            <DoughnutChart voteAVGInfos={voteInfos} />
          )}
        </div>
      </div>
    </div>
  );
}
