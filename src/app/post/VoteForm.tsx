'use client';

import { useRouter } from 'next/navigation';
import { SetStateAction, useState } from 'react';
import Image from 'next/image';

const colors = [
  {
    background: 'bg-[#000000]',
    text: 'text-[#000000]',
    hover: 'hover:[#000000]',
    border: 'border-[#000000]',
  },
  {
    background: 'bg-[#9D2A2C]',
    text: 'text-[#9D2A2C]',
    hover: 'hover:[#9D2A2C]',
    border: 'border-[#9D2A2C]',
  },
  {
    background: 'bg-[#CACACA]',
    text: 'text-[#CACACA]',
    hover: 'hover:[#CACACA]',
    border: 'border-[#CACACA]',
  },
  {
    background: 'bg-[#656565]',
    text: 'text-[#656565]',
    hover: 'hover:[#656565]',
    border: 'border-[#656565]',
  },
  {
    background: 'bg-[#6C0000]',
    text: 'text-[#6C0000]',
    hover: 'hover:[#6C0000]',
    border: 'border-[#6C0000]',
  },
];

const positions = [
  {
    name: 'TOP',
    ko: '탑',
    src: '/svg/top-w.svg',
  },
  {
    name: 'ADCARRY',
    ko: '원딜',
    src: '/svg/onedeal-w.svg',
  },
  {
    name: 'MID',
    ko: '미드',
    src: '/svg/mid-w.svg',
  },
  {
    name: 'JUNGLE',
    ko: '정글',
    src: '/svg/jungle-w.svg',
  },
  {
    name: 'SUPPORT',
    ko: '서폿',
    src: '/svg/supporter-w.svg',
  },
];

interface IVoteFormProps {
  voteInfo: GetVoteType[];
  setIsVoted: React.Dispatch<SetStateAction<boolean>>;
  postId: number;
}

export default function VoteForm({ voteInfo, setIsVoted, postId }: IVoteFormProps) {
  const router = useRouter();

  const [selectedChamp, setSelectedChamp] = useState<string>(voteInfo[0].championName);

  const handleSubmit = () => {};

  const changePositionName = (position: string) => {
    const positionName = positions.find((img) => img.name === position);
    return positionName ? positionName.ko : '';
  };

  const changeTierName = (tier: string) => {
    switch (tier) {
      case 'UNRANK':
        return '언랭';
      case 'IRON':
        return '아이언';
      case 'BRONZE':
        return '브론즈';
      case 'SILVER':
        return '실버';
      case 'GOLD':
        return '골드';
      case 'PLATINUM':
        return '플래티넘';
      case 'EMERALD':
        return '에메랄드';
      case 'DIAMOND':
        return '다이아';
      case 'MASTER':
        return '마스터';
      case 'GRANDMASTER':
        return '그랜드마스터';
      case 'CHALLENGER':
        return '챌린저';
    }
  };

  const changePostionSVG = (position: string) => {
    const positionImg = positions.find((img) => img.name === position);
    return positionImg ? positionImg.src : '';
  };

  return (
    //  <div className='p-content-pd p-content-rounded p-last-mb flex flex h-[313px] w-full items-center bg-white'>
    //     <div className='relative flex w-full flex-row items-center'>
    //       <Loading />
    //     </div>
    //   </div>
    <div className='p-content-pd p-content-rounded p-last-mb flex h-fit w-full flex-col bg-white'>
      <div className='relative flex w-full flex-row items-center'>
        <div className='mx-2 flex flex-col '>
          {voteInfo.map((ingameInfo, index) => (
            <div className={`${colors[index].hover} `} key={index}>
              <div
                onClick={() => {
                  return;
                }}
              />
              <label
                htmlFor={`${ingameInfo.inga}`}
                className={'v-label cursor-pointer ' + colors[index].border}
              >
                <div
                  className={
                    colors[index].text +
                    ' flex h-[48px] w-[48px] items-center justify-center rounded-full'
                  }
                >
                  <Image
                    src={changePostionSVG(ingameInfo.position)}
                    alt='position'
                    width={48}
                    height={48}
                  />
                </div>
                <div className='mx-[10px] text-[16px] font-semibold text-[#8A1F21]'>
                  {changePositionName(ingameInfo.position)}
                </div>
                <div className='w-[50%]'>
                  <div className='text=[#33333] text-[14px] font-semibold'>
                    {ingameInfo.championName}
                  </div>
                  <div className='text=[#33333] text-[12px]'>{changeTierName(ingameInfo.tier)}</div>
                </div>
              </label>
            </div>
          ))}
        </div>
        <div className='flex grow flex-col items-center justify-center'>
          <div className='mb-[3rem] text-[20px]'>이 게임의 과실은 몇 대 몇~?</div>
          <div className='flex  flex-col items-center'>
            <div className='p-content-s-mb flex flex-row'>
              {voteInfo.map((eachVote, index) => (
                <div key={index} className='flex'>
                  <div className={colors[index].border + ' p-voting-number-element'}>
                    {eachVote.ratio}
                  </div>
                  {index !== voteInfo.length - 1 && (
                    <div className='p-voting-number-element '> : </div>
                  )}
                </div>
              ))}
            </div>
            <div className='p-content-s-mb flex flex-row'>
              {/* {votingButtonInfos.map((vBtnInfo, index) => (
                <div key={index} className='flex'>
                  <input
                    type='radio'
                    className='p-input-hidden'
                    id={`vote-${index}`}
                    onChange={() => handleVoteButtonChange(index)}
                    checked={selectedIngameInfoId === vBtnInfo.selectedChampId}
                  />
                  {index === 0 ? (
                    <div className={handleVoteButtonStyleChange(index) + ' rounded-l-[30px]'}></div>
                  ) : index === 9 ? (
                    <label
                      htmlFor={`vote-${index}`}
                      className={handleVoteButtonStyleChange(index) + ' rounded-r-[30px]'}
                    ></label>
                  ) : (
                    <label
                      htmlFor={`vote-${index}`}
                      className={handleVoteButtonStyleChange(index)}
                    ></label>
                  )}
                </div>
              ))} */}
            </div>
          </div>
          <div className='text-[12px] text-[#7B7B7B]'>{selectedChamp}의 과실을 선택해주세요</div>
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
