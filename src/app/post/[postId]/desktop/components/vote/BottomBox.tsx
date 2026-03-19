import VotingGraph from '@/app/post/[postId]/desktop/components/vote/VotingGraph';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Icon_Hamburger from '../../../../../../../public/svg/postItem/hamburger.svg';
import Icon_Hamburger_activated from '../../../../../../../public/svg/postItem/hamburger_activated.svg';
import tiers from '@/constants/tier';
import usePostIdStore from '../../../store/usePostIdStore';
import { voteColors } from '@/data/championData';

interface IProps {
  voteInfo: IGetInGameInfoType[];
  handleVoteSubmit: () => void;
  isHamburgerClicked: boolean;
  setIsHamburgerClicked: Dispatch<SetStateAction<boolean>>;
}

export default function BottomBox({
  voteInfo,
  handleVoteSubmit,
  isHamburgerClicked,
  setIsHamburgerClicked,
}: IProps) {
  const { voteResult, isNotAbleSubmit, selectedChampIdx } = usePostIdStore();

  const getTierIcon = useCallback((tier: string) => {
    return tiers.find((item) => item.content === tier)?.svg;
  }, []);

  const getTierColor = useCallback((tier: string) => {
    return tiers.find((item) => item.content === tier)?.color;
  }, []);
  return (
    <div className='flex flex-col relative items-center w-[618px] min-h-[136px]'>
      <Image
        src={isHamburgerClicked ? Icon_Hamburger_activated : Icon_Hamburger}
        width={26}
        height={26}
        alt='hamburger'
        className='cursor-pointer absolute end-[5px]'
        onClick={() => {
          setIsHamburgerClicked(!isHamburgerClicked);
        }}
      />
      <div>
        {isHamburgerClicked ? (
          <div className='flex flex-col items-center w-[618px] gap-[16px]'>
            {voteInfo.map((champion) => (
              <div className='flex items-center w-full' key={champion.championName}>
                <Image
                  width={40}
                  height={40}
                  src={''}
                  alt='profile_img'
                  className='rounded-full mr-[14px]'
                />
                <p className='font-bold text-[14px] text-[#333333]'>
                  이름이름<span className='text-[12px] font-semibold text-[#C8C8C8]'>#dddd</span>
                </p>
                <div className='flex items-center'>
                  {getTierIcon(champion.tier)}
                  <p
                    className='text-[14px] font-semibold '
                    style={{ color: getTierColor(champion.tier) }}
                  >
                    {champion.tier}
                  </p>
                </div>
                <p className='text-[14px] text-[#777777] font-semibold '>{champion.position}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center w-[618px]'>
            <div className='p-content-s-mb flex'>
              <VotingGraph />
            </div>
            <div className='p-content-s-mb flex'>
              {voteResult.map((vote, index) => (
                <div key={index} className={` flex`}>
                  <p className={`${voteColors[index].text} p-voting-number-element`}>{vote}</p>
                  {index !== voteInfo.length - 1 && (
                    <div className='p-voting-number-element'> : </div>
                  )}
                </div>
              ))}
            </div>
            <p className='text-[12px] text-[#909090] font-bold'>
              <span className='text-[#666666]'>{voteInfo[selectedChampIdx]?.championName}</span>의
              과실을 선택해주세요
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
        )}
      </div>
    </div>
  );
}
